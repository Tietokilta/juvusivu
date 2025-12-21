"use client";
import { Checkbox, Input } from "@components/basic/input";
import {
  ApiError,
  EditSignupProvider,
  useDeleteSignup,
  useEditSignupContext,
  useUpdateSignup,
} from "@tietokilta/ilmomasiina-client";
import { Window } from "@components/Window";
import {
  ErrorCode,
  QuestionType,
  SignupUpdateBody,
  SignupValidationError,
} from "@tietokilta/ilmomasiina-models";
import { Button } from "@components/basic/Button";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useActionState, useState } from "react";
import { useScopedI18n } from "@locales/client";
import { FieldErrorText } from "@components/signup/FieldErrorText";
import { QuestionInput } from "@components/signup/QuestionInput";
import { QuotaPositionText } from "@components/signup/QuotaPositionText";

export const EditForm = ({ id, token }: { id: string; token: string }) => {
  return (
    <EditSignupProvider id={id} editToken={token}>
      <EditFormInternal />
    </EditSignupProvider>
  );
};

const InputRow = ({
  label,
  children,
  mandatory = false,
}: {
  label: string;
  children: React.ReactNode;
  mandatory?: boolean;
}) => (
  <div className="mb-2">
    <p className="font-pixel text-lg">
      {label} {mandatory && <span className="text-juvu-red">*</span>}
    </p>
    {children}
  </div>
);

type SignupState = {
  fieldErrors?: SignupValidationError["errors"] | null;
  generalError?: ApiError | null;
  success?: boolean | null;
};

const EditFormInternal = () => {
  const { localizedEvent, localizedSignup, pending, isNew } =
    useEditSignupContext();
  const router = useRouter();
  const saveSignup = useUpdateSignup();
  const deleteSignup = useDeleteSignup();
  const t = useScopedI18n("ilmomasiina");
  const t_e = useScopedI18n("errors.ilmo.code");
  console.log("isNew", isNew);
  console.log("localizedSignup", localizedSignup);
  const [saved, setSaved] = useState<boolean>(false);
  const confirmed = localizedSignup?.confirmed || saved;

  const SaveAction = async (prevState: SignupState, formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    // Process answers from questions
    const answers =
      localizedEvent?.questions.map((q) => {
        if (q.type === QuestionType.CHECKBOX) {
          const values = formData.getAll(`question_${q.id}`) as string[];
          return {
            questionId: q.id,
            answer: values,
          };
        } else {
          const value = formData.get(`question_${q.id}`) as string;
          return {
            questionId: q.id,
            answer: value || "",
          };
        }
      }) ?? [];

    const updateBody: SignupUpdateBody = {
      firstName,
      lastName,
      email,
      answers,
    };

    try {
      await saveSignup(updateBody);
      setSaved(true);
      return { errors: null, success: true }; // Success - clear errors
    } catch (error) {
      const fieldErrors =
        error instanceof ApiError &&
        error.code === ErrorCode.SIGNUP_VALIDATION_ERROR
          ? (error.response! as SignupValidationError).errors
          : null;
      const generalError = error instanceof ApiError ? error : null;

      return { errors: fieldErrors, generalError, success: null };
    }
  };

  const [state, formAction] = useActionState<SignupState, FormData>(
    SaveAction,
    { fieldErrors: null, generalError: null, success: null },
  );
  const errors = state?.fieldErrors;
  const generalError = state?.generalError;

  const handleSubmit = (event: FormEvent) => {
    if (!(event.target instanceof HTMLFormElement))
      throw new Error("Form submission event target is not a form element");

    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your signup?")) {
      deleteSignup();
      router.push(`/events/${localizedEvent?.slug}`);
    }
  };

  if (pending) {
    return (
      <Window title="Loading signup" className="mx-auto my-7 max-w-3xl">
        <p className="font-pixel text-lg">Loading...</p>
      </Window>
    );
  }

  if (!localizedSignup || !localizedEvent) {
    return (
      <Window title="Signup not found" className="mx-auto my-7 max-w-3xl">
        <p className="font-pixel text-lg">
          Try signing up again or check the link.
        </p>
      </Window>
    );
  }

  return (
    <div>
      <Window
        title={`${t("signup-for")} ${localizedEvent?.title}`}
        className="mx-auto my-7 max-w-3xl"
      >
        <Form onSubmit={handleSubmit} action={() => undefined}>
          <div className="flex flex-col gap-2">
            <QuotaPositionText
              signup={localizedSignup}
              event={localizedEvent}
            />
            {localizedEvent?.nameQuestion && (
              <>
                <InputRow label={t("form.First name")} mandatory={true}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder={t("form.First name")}
                    defaultValue={localizedSignup?.firstName ?? ""}
                    disabled={confirmed}
                  />
                  <FieldErrorText error={errors?.firstName} />
                </InputRow>
                <InputRow label={t("form.Last name")} mandatory={true}>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder={t("form.Last name")}
                    defaultValue={localizedSignup?.lastName ?? ""}
                    disabled={confirmed}
                  />
                  <FieldErrorText error={errors?.lastName} />
                </InputRow>
                <label className="mb-2">
                  <Checkbox
                    name="namePublic"
                    defaultChecked={localizedSignup?.namePublic ?? false}
                  />
                  {t("form.Show name in the public list of sign ups")}
                </label>
              </>
            )}
            {localizedEvent?.emailQuestion && (
              <InputRow label={t("form.Email")} mandatory={true}>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("form.Email")}
                  defaultValue={localizedSignup?.email ?? ""}
                  disabled={confirmed}
                />
                <FieldErrorText error={errors?.email} />
              </InputRow>
            )}
            {localizedEvent?.questions.map((q) => (
              <InputRow key={q.id} label={q.question} mandatory={q.required}>
                <QuestionInput
                  question={q}
                  defaultValue={
                    localizedSignup?.answers.find(
                      (answer) => answer.questionId === q.id,
                    )?.answer ?? undefined
                  }
                />
                <FieldErrorText error={errors?.answers?.[q.id]} />
              </InputRow>
            ))}
            <p className="font-pixel text-lg">
              {t(
                "form.You can edit your sign up or delete it later from this page, which will be sent to your email in the confirmation message",
              )}
            </p>

            {state?.success && (
              <p className="font-pixel text-lg text-green-700">
                {t("form.Sign up saved")}
              </p>
            )}
            {generalError && (
              <p className="font-pixel text-juvu-red text-lg">
                {generalError.code
                  ? t_e(generalError.code)
                  : generalError.message}
              </p>
            )}

            <div className="flex gap-2">
              <Button type="submit" text={t("form.Submit")} />
              <Button
                type="button"
                text={t("form.Delete")}
                onClick={handleDelete}
              />
            </div>
          </div>
        </Form>
      </Window>
    </div>
  );
};

/*
TODO
- Better confirm dialog for Deletion
- Show what info is public
- Styling
- Activate signup button when signup opens
- Show when signup is open/closed
- Localization
- Refactor components
*/
