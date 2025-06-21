export default function Option({
  option,
  handleOptionClick,
  index,
  correct,
  selected,
}) {
  return (
    <div>
      <div
        className={`option ${
          selected !== null && index === correct
            ? "trueAnswer"
            : index !== correct && selected === index
            ? "falseAnswer"
            : ""
        }`}
        onClick={() => handleOptionClick(index)}
      >
        {option}
      </div>
    </div>
  );
}
