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
import NextButton from "./components/NextButton";
import { Progress } from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import { Timer } from "./components/Timer";
import Footer from "./components/Footer";

const initialState = {
  questions: [],

  //loading, ready, error, active, finished
  status: "loading",
  index: 14,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
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
      };
      break;
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finishedQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
      break;
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
      break;
    default:
      break;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const TotalPoints = questions
    ?.map((questions) => questions.points)
    .reduce((acc, value) => acc + value, 0);

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
          <>
            <Progress
              index={index}
              numQuesion={numQuesion}
              TotalPoints={TotalPoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                points={points}
                numQuesion={numQuesion}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            TotalPoints={TotalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
