import { useEffect } from "react";
import Option from "./Option";

export default function Question({
  currentQuestion,
  handleOptionClick,
  selected,
  handleClick,
  i,
  length,
  score,
  handleFinish,
  dispatch,
  secondsRemaining,
}) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="questions">
      <span className="progress-score">Score:{score}</span>
      <progress
        value={selected === null ? i - 1 : i}
        max={length}
        className="progress"
      ></progress>
      <span className="progress-status">
        {i}/{length}
      </span>
      <p>{currentQuestion.question}</p>
      {currentQuestion.options?.map((option, index) => (
        <Option
          option={option}
          index={index}
          correct={currentQuestion.correctOption}
          selected={selected}
          handleOptionClick={handleOptionClick}
          key={option}
          i={i}
        />
      ))}
      <div className="footer">
        <div className="next timer">
          {Math.floor(secondsRemaining / 60) < 10 ? 0 : ""}
          {Math.floor(secondsRemaining / 60)}:
          {secondsRemaining % 60 < 10 ? 0 : ""}
          {secondsRemaining % 60}
        </div>
        {selected !== null && i < length ? (
          <div className="next" onClick={handleClick}>
            Next
          </div>
        ) : selected !== null && i === length ? (
          <div className="next" onClick={handleFinish}>
            Finish
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
