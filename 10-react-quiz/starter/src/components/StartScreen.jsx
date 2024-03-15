import React from "react";

const StartScreen = ({ numQuesion, dispatch }) => {
  return (
    <div>
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuesion || "No"} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        {" "}
        Lets Start
      </button>
    </div>
  );
};

export default StartScreen;
