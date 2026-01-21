"use client";
import { Checkbox, Input } from "@components/basic/input";
import {
  ApiError,
  configureApi,
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
import { questionHasPrices } from "@tietokilta/ilmomasiina-client/dist/utils/paymentUtils";
import { Button } from "@components/basic/Button";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useActionState, useState } from "react";
import { FieldErrorText } from "@components/signup/FieldErrorText";
import { QuestionInput } from "@components/signup/QuestionInput";
import { QuotaPositionText } from "@components/signup/QuotaPositionText";
import { SignupConfirmTime } from "@components/signup/SignupConfirmTime";
import { PaymentInfo } from "@components/signup/PaymentInfo";
import { ILMOMASIINA_API_BASE_URL } from "@util/constants";
import { useLocale, useTranslations } from "next-intl";

export const EditForm = ({
  id,
  token,
  paid,
}: {
  id: string;
  token: string;
  paid?: boolean;
}) => {
  // Set ilmomasiina API base URL
  configureApi(ILMOMASIINA_API_BASE_URL);
  const [refetchKey, setRefetchKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const locale = useLocale();

  return (
    <EditSignupProvider
      id={id}
      editToken={token}
      key={refetchKey}
      language={locale}
      paid={paid}
    >
      <EditFormInternal
        onRefetch={() => {
          setShowSuccess(true);
          setRefetchKey((k) => k + 1);
        }}
        showSuccess={showSuccess}
        onFormChange={() => setShowSuccess(false)}
      />
    </EditSignupProvider>
  );
};

const InputRow = ({
  label,
  children,
  mandatory = false,
  publicField = false,
}: {
  label: string;
  children: React.ReactNode;
  mandatory?: boolean;
  publicField?: boolean;
}) => {
  const t = useTranslations();
  return (
    <div className="mb-2">
      <p className="font-pixel text-lg">
        {label} {mandatory && <span className="text-juvu-red-dark">*</span>}{" "}
        {publicField && (
          <span className="text-juvu-blue-light">({t("public")})</span>
        )}
      </p>
      {children}
    </div>
  );
};

type SignupState = {
  fieldErrors?: SignupValidationError["errors"] | null;
  generalError?: ApiError | null;
  success?: boolean | null;
};

const EditFormInternal = ({
  onRefetch,
  showSuccess,
  onFormChange,
}: {
  onRefetch: () => void;
  showSuccess: boolean;
  onFormChange: () => void;
}) => {
  const {
    localizedEvent,
    localizedSignup,
    pending,
    confirmableUntil,
    canEdit,
    canEditNameAndEmail,
    canEditPaidQuestions,
  } = useEditSignupContext();
  const router = useRouter();
  const saveSignup = useUpdateSignup();
  const deleteSignup = useDeleteSignup();
  const t = useTranslations("ilmomasiina");
  const t_e = useTranslations("errors.ilmo.code");
  const t_general = useTranslations();
  const [saved, setSaved] = useState<boolean>(false);
  const confirmed = localizedSignup?.confirmed || saved;
  const closed =
    (localizedEvent?.registrationEndDate &&
      new Date(localizedEvent.registrationEndDate) < new Date()) ||
    !localizedEvent?.registrationStartDate ||
    new Date(localizedEvent.registrationStartDate) > new Date();

  const SaveAction = async (prevState: SignupState, formData: FormData) => {
    const firstName = (formData.get("firstName") as string) ?? undefined;
    const lastName = (formData.get("lastName") as string) ?? undefined;
    const email = (formData.get("email") as string) ?? undefined;
    const namePublic = formData.get("namePublic") === "on";

    // Process answers from questions
    const answers =
      localizedEvent?.questions.map((q) => {
        if (!canEditPaidQuestions && questionHasPrices(q)) {
          // Keep existing answer if paid question is not editable
          return {
            questionId: q.id,
            answer:
              localizedSignup?.answers.find(
                (answer) => answer.questionId === q.id,
              )?.answer ?? "",
          };
        } else if (q.type === QuestionType.CHECKBOX) {
          const values = formData.getAll(`question_${q.id}`) as string[];
          return {
            questionId: q.id,
            answer: values,
          };
        } else {
          const value = formData.get(`question_${q.id}`) as string | null;
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
      namePublic,
      answers,
    };

    try {
      await saveSignup(updateBody);
      onRefetch(); // Trigger refetch to get updated signup data
      setSaved(true);
      return { success: true }; // Success - clear errors
    } catch (error) {
      const fieldErrors =
        error instanceof ApiError &&
        error.code === ErrorCode.SIGNUP_VALIDATION_ERROR
          ? (error.response! as SignupValidationError).errors
          : null;
      const generalError = error instanceof ApiError ? error : null;

      return { fieldErrors, generalError, success: null };
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

  const handleDelete = async () => {
    if (confirm(t("delete-confirm"))) {
      try {
        await deleteSignup();
        router.push(`/events/${localizedEvent?.slug}`);
      } catch (error) {
        console.error("Error deleting signup:", error);
        alert(t("delete-fail"));
      }
    }
  };

  if (pending) {
    return (
      <Window title={t("loading-signup")} className="mx-auto my-7 max-w-3xl">
        <p className="font-pixel text-lg">{t_general("loading")}</p>
      </Window>
    );
  }

  if (!localizedSignup || !localizedEvent) {
    return (
      <Window title={t_e("NoSuchSignup")} className="mx-auto my-7 max-w-3xl">
        <p className="font-pixel text-lg">
          {t_general("errors.ilmomasiina-signup-not-found")}
        </p>
      </Window>
    );
  }

  return (
    <div className="mx-0.5">
      <PaymentInfo />
      <Window
        title={`${localizedEvent?.title}: ${t("Ilmoittautuminen")} `}
        className="mx-auto my-7 max-w-3xl"
      >
        <Form
          onSubmit={handleSubmit}
          onChange={onFormChange}
          action={() => undefined}
        >
          <div className="flex flex-col gap-2">
            <QuotaPositionText signup={localizedSignup} />
            {!confirmed && (
              <SignupConfirmTime confirmableUntil={confirmableUntil} />
            )}
            {localizedEvent?.nameQuestion && (
              <>
                <InputRow label={t("form.First name")} mandatory={true}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder={t("form.First name")}
                    defaultValue={localizedSignup?.firstName ?? ""}
                    disabled={!canEditNameAndEmail}
                  />
                  <FieldErrorText error={errors?.firstName} />
                </InputRow>
                <InputRow label={t("form.Last name")} mandatory={true}>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder={t("form.Last name")}
                    defaultValue={localizedSignup?.lastName ?? ""}
                    disabled={!canEditNameAndEmail}
                  />
                  <FieldErrorText error={errors?.lastName} />
                </InputRow>
                <label className="mb-2">
                  <Checkbox
                    name="namePublic"
                    defaultChecked={localizedSignup?.namePublic ?? false}
                    disabled={!canEdit}
                  />
                  {t("form.namePublic")}
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
                  disabled={!canEditNameAndEmail}
                />
                <FieldErrorText error={errors?.email} />
              </InputRow>
            )}
            {localizedEvent?.questions.map((q) => (
              <InputRow
                key={q.id}
                label={q.question}
                mandatory={q.required}
                publicField={q.public}
              >
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

            {closed ? (
              <p className="font-pixel text-juvu-red-dark text-lg">
                {t_e("SignupsClosed")}
              </p>
            ) : !canEdit ? null : (
              <p className="font-pixel text-lg">{t("form.editInstructions")}</p>
            )}

            {state?.success && (
              <p className="font-pixel text-lg text-green-700">
                {t("form.Sign up saved")}
              </p>
            )}
            {showSuccess && (
              <p className="font-pixel text-lg text-green-700">
                {t("form.Sign up saved")}
              </p>
            )}
            {generalError && (
              <p className="font-pixel text-juvu-red-dark text-lg">
                {generalError.code
                  ? t_e(generalError.code)
                  : generalError.message}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                text={t("form.Submit")}
                disabled={!canEdit}
              />
              <Button
                type="button"
                text={t("form.Delete")}
                onClick={handleDelete}
                disabled={!canEdit}
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
*/
