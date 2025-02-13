import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const counterReducer = useSelector((state) => state);
  console.log("state", counterReducer.counter);

  const dispatch = useDispatch();
  return (
    <>
      <h1>Counter</h1>
      <h2>{counterReducer.counter.number}</h2>
      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
          })
        }
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "DECREMENT",
          })
        }
      >
        -
      </button>
    </>
  );
}

export default App;
