import { Input, Checkbox, Radio, Textarea } from "@components/basic/input";
import { Question, QuestionType } from "@tietokilta/ilmomasiina-models";

export const QuestionInput = ({
  question,
  defaultValue,
}: {
  question: Question;
  defaultValue?: string | string[];
}) => {
  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <Input
          type="text"
          name={`question_${question.id}`}
          placeholder="Text"
          defaultValue={defaultValue}
        />
      );
    case QuestionType.TEXT_AREA:
      return (
        <Textarea
          name={`question_${question.id}`}
          defaultValue={defaultValue}
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
                  />
                  {option}
                  {price > 0 ? ` (+${price / 100} €)` : ""}
                </label>
              </div>
            );
          })}
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
                  />
                  {option}
                  {price > 0 ? ` (+${price / 100} €)` : ""}
                </label>
              </div>
            );
          })}
        </>
      );
    case QuestionType.NUMBER:
      return (
        <Input
          type="number"
          name={`question_${question.id}`}
          defaultValue={defaultValue}
        />
      );
    default:
      return <p>Unsupported question type {question.type}</p>;
  }
};
