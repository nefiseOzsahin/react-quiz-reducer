import { useEffect, useReducer } from "react";
import Intro from "./Intro";
import Question from "./Question";
import Finish from "./Finish";

const TIME_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return {
        ...state,
        questions: action.payload,
        secondsRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "setCurrentQuestion":
      return { ...state, currentQuestion: action.payload };
    case "setI":
      return { ...state, i: action.payload + 1 };
    case "setSelection":
      return { ...state, selected: action.payload };
    case "resetSelection":
      return { ...state, selected: null };
    case "calculateScore":
      const isCorrect = action.payload.index === action.payload.correct;
      return {
        ...state,
        score: isCorrect
          ? action.payload.score + state.currentQuestion.points
          : action.payload.score,
      };
    case "setFinish":
      return { ...state, finish: action.payload };
    case "restart":
      return {
        questions: state.questions,
        currentQuestion: null,
        i: 0,
        selected: null,
        score: 0,
        finish: false,
        secondsRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "tick":
      const newSeconds = state.secondsRemaining - 1;
      return {
        ...state,
        secondsRemaining: newSeconds,
        finish: newSeconds === 0,
      };

    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const inials = {
    questions: [],
    currentQuestion: null,
    i: 0,
    selected: null,
    score: 0,
    finish: false,
    secondsRemaining: null,
  };
  const [state, dispatch] = useReducer(reducer, inials);
  const {
    questions,
    currentQuestion,
    i,
    selected,
    score,
    finish,
    secondsRemaining,
  } = state;

  function handleClick() {
    dispatch({ type: "setCurrentQuestion", payload: state.questions[i] });
    dispatch({ type: "setI", payload: state.i });
    dispatch({ type: "resetSelection" });
  }

  function handleOptionClick(index) {
    debugger;
    dispatch({ type: "setSelection", payload: index });
    dispatch({
      type: "calculateScore",
      payload: {
        score: state.score,
        index: index,
        correct: currentQuestion.correctOption,
      },
    });
  }

  function handleFinish() {
    dispatch({ type: "setFinish", payload: true });
  }

  function handleRestart() {
    dispatch({ type: "restart" });
  }

  useEffect(function () {
    fetch("questions.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "setQuestions", payload: data.questions });
      });
  }, []);

  const totalScore = questions.reduce((acc, q) => acc + q.points, 0);
  return (
    <div className="main">
      <header>
        <img className="react-logo" src="react.svg" alt="react logo"></img>
        <h1>The React Quiz</h1>
      </header>

      {!currentQuestion && !finish && (
        <Intro questions={questions} handleClick={handleClick} i={i} />
      )}

      {currentQuestion && finish === false && (
        <Question
          currentQuestion={currentQuestion}
          handleOptionClick={handleOptionClick}
          selected={selected}
          handleClick={handleClick}
          i={i}
          length={questions.length}
          score={score}
          handleFinish={handleFinish}
          secondsRemaining={secondsRemaining}
          dispatch={dispatch}
        />
      )}
      {finish === true && (
        <Finish
          score={score}
          totalScore={totalScore}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
}
