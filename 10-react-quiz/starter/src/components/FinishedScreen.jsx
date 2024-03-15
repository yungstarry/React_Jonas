import React from "react";

const FinishedScreen = ({ points, TotalPoints, highscore, dispatch }) => {
  const percentage = (points / TotalPoints) * 100;
  return (
    <>
      <p className="result">
        you scored
        <strong> {points} </strong>
        out of {TotalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>Restart Quiz</button>
    </>
  );
};

export default FinishedScreen;
