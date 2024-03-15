import React from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./components/Main";
import { useEffect } from "react";
import { useReducer } from "react";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {...state, questions: action.payload, status: 'ready'}
      break;

    default:
      throw new Error("Action unknown")
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        console.log(res);
        const data = await res.json();
        if (!res.ok) throw new Error("Opps Something went wrong");
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        <p>i</p>
      </Main>
    </div>
  );
};

export default App;
