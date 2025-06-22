export default function Finish({ score, totalScore, handleRestart }) {
  return (
    <div className="finish">
      <p className="resart">
        Your Score:Score:{score} out of {totalScore}
      </p>
      <div className="resart next" onClick={handleRestart}>
        Restart Quiz
      </div>
    </div>
  );
}
