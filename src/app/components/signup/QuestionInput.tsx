import { Input, Checkbox, Radio, Textarea } from "@components/basic/input";
import { Question, QuestionType } from "@tietokilta/ilmomasiina-models";

export const QuestionInput = ({
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
    return <Textarea defaultValue={defaultValue}></Textarea>;
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
