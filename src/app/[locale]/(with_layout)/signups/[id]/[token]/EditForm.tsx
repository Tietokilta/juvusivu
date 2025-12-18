"use client";
import { Checkbox, Input, Radio } from "@components/basic/input";
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
  Question,
  QuestionType,
  SignupFieldError,
  SignupUpdateBody,
  SignupValidationError,
} from "@tietokilta/ilmomasiina-models";
import { Button } from "@components/basic/Button";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

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
      {label} {mandatory && <span className="text-red-600">*</span>}
    </p>
    {children}
  </div>
);

const QuestionInput = ({
  question,
  defaultValue,
}: {
  question: Question;
  defaultValue?: string | string[];
}) => {
  if (question.type === QuestionType.TEXT) {
    return (
      <Input
        type="text"
        name={`question_${question.id}`}
        placeholder="Text"
        defaultValue={defaultValue}
      />
    );
  } else if (question.type === QuestionType.TEXT_AREA) {
    return (
      <textarea
        className="border-b-accent-dark bg-juvu-white flex w-full border-2"
        defaultValue={defaultValue}
      ></textarea>
    );
  } else if (question.type === QuestionType.CHECKBOX) {
    return (
      <>
        {(question.options ?? []).map((option) => (
          <div key={option}>
            <label>
              <Checkbox
                name={`question_${question.id}`}
                value={option}
                defaultChecked={defaultValue?.includes(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </>
    );
  } else if (question.type === QuestionType.SELECT) {
    return (
      <>
        {(question.options ?? []).map((option) => (
          <div key={option}>
            <label>
              <Radio
                name={`question_${question.id}`}
                value={option}
                defaultChecked={defaultValue === option}
              />
              {option}
            </label>
          </div>
        ))}
      </>
    );
  } else if (question.type === QuestionType.NUMBER) {
    return <Input type="number" name={`question_${question.id}`} />;
  }
};

const EditFormInternal = () => {
  const { localizedEvent, localizedSignup, pending } = useEditSignupContext();
  const router = useRouter();
  const saveSignup = useUpdateSignup();
  const deleteSignup = useDeleteSignup();
  const confirmed = localizedSignup?.confirmed ?? false;

  const handleSubmit = async (
    prevState: SignupValidationError["errors"] | null,
    formData: FormData,
  ) => {
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
      return null; // Success - clear errors
    } catch (error) {
      const errors =
        error instanceof ApiError &&
        error.code === ErrorCode.SIGNUP_VALIDATION_ERROR
          ? (error.response! as SignupValidationError).errors
          : null;

      return errors ?? null;
    }
  };

  const [errors, formAction] = useActionState<
    SignupValidationError["errors"] | null,
    FormData
  >(handleSubmit, null);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your signup?")) {
      deleteSignup();
      router.push(`/events/${localizedEvent?.slug}`);
    }
  };

  if (pending) {
    return <div>Loading...</div>; //TODO: Better loading state
  }

  return (
    <div>
      <Window
        title={`Signup for ${localizedEvent?.title}`}
        className="mx-auto my-7 max-w-3xl"
      >
        <Form action={formAction}>
          <div className="flex flex-col gap-2">
            {localizedEvent?.nameQuestion && (
              <>
                <InputRow label="First name" mandatory={true}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    defaultValue={localizedSignup?.firstName ?? ""}
                    disabled={confirmed}
                  />
                </InputRow>
                <InputRow label="Last name" mandatory={true}>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    defaultValue={localizedSignup?.lastName ?? ""}
                    disabled={confirmed}
                  />
                </InputRow>
                <InputRow label="Display name publicly">
                  <Checkbox
                    name="namePublic"
                    defaultChecked={localizedSignup?.namePublic ?? false}
                  />
                </InputRow>
              </>
            )}
            {localizedEvent?.emailQuestion && (
              <InputRow label="Email" mandatory={true}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={localizedSignup?.email ?? ""}
                  disabled={confirmed}
                />
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
                {errors?.answers?.[q.id] && (
                  <div className="text-red-600">{errors.answers[q.id]}</div>
                )}
              </InputRow>
            ))}
            <div className="flex gap-2">
              <Button type="submit" text="Save" />
              <Button text="Delete" type="button" onClick={handleDelete} />
            </div>
          </div>
        </Form>
      </Window>
    </div>
  );
};

/*
TODO
- Do not reset the form on error
- Better confirm dialog for Deletion
- Info about queue position
- Better errors
- Better loading state
- Styling
- Activate signup button when signup opens
- Show when signup is open/closed
- Localization
- Refactor components
*/
