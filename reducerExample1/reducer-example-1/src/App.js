import { act, useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { ...state, count: 0, step: 1 };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  //const [step, setStep] = useState(1);
  //const [count, setCount] = useState(0);
  const inials = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, inials);

  const { count, step } = state;
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function handleDecrease() {
    dispatch({ type: "dec", payload: step });
    //setCount((prev) => Number(prev) - Number(step));
  }

  function handleIncrease() {
    dispatch({ type: "inc", payload: step });
    //setCount((prev) => Number(prev) + Number(step));
  }

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    //setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    //setStep(Number(e.target.value));
  };

  function reset() {
    dispatch({ type: "reset" });
  }

  return (
    <div>
      <div className="range">
        <label>0</label>
        <input
          type="range"
          min="1"
          max="100"
          value={step}
          step="1"
          onChange={defineStep}
        />
        <label>100</label>
      </div>
      <div className="step">{step}</div>
      <div className="input">
        <button onClick={handleDecrease}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className="date">
        <p>{date.toLocaleDateString()}</p>
      </div>
      <div className="button">
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
