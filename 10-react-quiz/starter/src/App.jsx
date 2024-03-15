import React from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./components/Main";
import { useEffect } from "react";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],

  //loading, ready, error, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, questions: action.payload, status: "ready" };
      break;
    case "dataFailed":
      return { ...state, status: "error" };
      break;
    case "start":
      return { ...state, status: "active" };
      break;
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
      break;

    default:
      break;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;

  const numQuesion = questions.length;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        console.log(data);

        dispatch({ type: "getData", payload: data });
        if (!res.ok) throw new Error("Something went wrong");
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {/* {status === "ready" && (
          <StartScreen numQuesion={numQuesion} dispatch={dispatch} />
        )} */}

        {status === "ready" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
