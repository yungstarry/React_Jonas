import React from "react";

const NextButton = ({ dispatch, answer, numQuesion , index}) => {
  if (answer === null) return null;
  const hasFinished = index < numQuesion - 1  


  return (
    <div>
      {hasFinished ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finishedQuiz" })}
        >
          Sumbit
        </button>
      )}
    </div>
  );
};

export default NextButton;
