import React, { useState } from "react";
import { Badge } from "../../components";
import { highlight, languages } from "prismjs/components/prism-core";
import Editor from "react-simple-code-editor";
import "./styles.scoped.scss";

const QuestionItem = ({
  index,
  content,
  answers,
  currentQ,
  setYourAnswer,
  item,
  yourAnswerSubmit,
  setIsSaveNext,
}) => {
  const [check, setCheck] = useState("");

  const handleSubmitAnswer = (e) => {
    setYourAnswer({
      answerSubmit: e.currentTarget.value,
      questionSubmit: item,
    });
    setIsSaveNext(true);
    setCheck(e.currentTarget.value);
  };

  return (
    <>
      {index === currentQ && (
        <>
          <div className="d-flex justify-content-between">
            <h2 className="question-name">Question {index + 1}</h2>
            <h3>
              <Badge color="secondary">{item.category.name}</Badge>
            </h3>
          </div>
          <div className="question-content">
            <Editor
              value={content}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              placeholder="code hear"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: "1px solid",
              }}
            />
          </div>
          <ul className="list-answer">
            <p className="text">Choose the correct answers:</p>
            {answers.map((item, index) => (
              <li
                className={`answer-item cursor-pointer ${
                  yourAnswerSubmit && item.isCorrect
                    ? "user-submit"
                    : "user-submit-error"
                }`}
                key={index}
              >
                <input
                  onChange={handleSubmitAnswer}
                  value={item.content}
                  type={yourAnswerSubmit ? "checkbox" : "radio"}
                  defaultChecked={check === item.content}
                  name="answer"
                  disabled={yourAnswerSubmit.length > 0}
                  id={item.id}
                  className="answer"
                />
                <label htmlFor={item.id}>{item.content}</label>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default QuestionItem;
