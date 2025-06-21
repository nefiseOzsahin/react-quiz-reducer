export default function Intro({ questions, handleClick, i }) {
  console.log(i);
  return (
    <div className="intro">
      <h3>Welcome to the React Quiz!</h3>
      <p>{questions.length} questions to test your React mastery!</p>
      <button className="start-btn" onClick={handleClick}>
        Let's Start
      </button>
    </div>
  );
}
