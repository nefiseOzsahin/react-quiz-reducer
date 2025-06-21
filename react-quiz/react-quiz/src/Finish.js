export default function Finish({ score, totalScore, handleRestart }) {
  return (
    <div className="intro">
      Your Score:Score:{score} out of {totalScore}
      <div className="resart" onClick={handleRestart}>
        Restart Quiz
      </div>
    </div>
  );
}
