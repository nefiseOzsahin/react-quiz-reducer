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
}) {
  console.log(currentQuestion.correctOption + "questiondangelen trueoption");
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
  );
}
