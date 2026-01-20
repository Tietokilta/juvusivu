import { Input, Checkbox, Radio, Textarea } from "@components/basic/input";
import { useEditSignupContext } from "@tietokilta/ilmomasiina-client";
import { Question, QuestionType } from "@tietokilta/ilmomasiina-models";
import { questionHasPrices } from "@tietokilta/ilmomasiina-client/dist/utils/paymentUtils";
import { useScopedI18n } from "@locales/client";

export const QuestionInput = ({
  question,
  defaultValue,
}: {
  question: Question;
  defaultValue?: string | string[];
}) => {
  const { canEditPaidQuestions, canEdit } = useEditSignupContext();
  const t = useScopedI18n("ilmomasiina.form");
  const disabled =
    !canEdit || (!canEditPaidQuestions && questionHasPrices(question));

  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <Input
          type="text"
          name={`question_${question.id}`}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      );
    case QuestionType.TEXT_AREA:
      return (
        <Textarea
          name={`question_${question.id}`}
          defaultValue={defaultValue}
          disabled={disabled}
        ></Textarea>
      );
    case QuestionType.CHECKBOX:
      return (
        <>
          {(question.options ?? []).map((option, i) => {
            const price = question.prices ? question.prices[i] : 0;
            return (
              <div key={option}>
                <label>
                  <Checkbox
                    name={`question_${question.id}`}
                    value={option}
                    defaultChecked={defaultValue?.includes(option)}
                    disabled={disabled}
                  />
                  {option}
                  {price > 0 ? ` (+${price / 100} €)` : ""}
                </label>
              </div>
            );
          })}
          {canEdit && disabled && (
            <p className="font-pixel mt-2">{t("uneditablePaidQuestion")}</p>
          )}
        </>
      );
    case QuestionType.SELECT:
      return (
        <>
          {(question.options ?? []).map((option, i) => {
            const price = question.prices ? question.prices[i] : 0;
            return (
              <div key={option}>
                <label>
                  <Radio
                    name={`question_${question.id}`}
                    value={option}
                    defaultChecked={defaultValue === option}
                    disabled={disabled}
                  />
                  {option}
                  {price > 0 ? ` (+${price / 100} €)` : ""}
                </label>
              </div>
            );
          })}
          {canEdit && disabled && (
            <p className="font-pixel mt-2">{t("uneditablePaidQuestion")}</p>
          )}
        </>
      );
    case QuestionType.NUMBER:
      return (
        <Input
          type="number"
          name={`question_${question.id}`}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      );
    default:
      return <p>Unsupported question type {question.type}</p>;
  }
};
