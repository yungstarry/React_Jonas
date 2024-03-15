import React from "react";

export const Progress = ({
  index,
  numQuesion,
  points,
  TotalPoints,
  answer,
}) => {
  return (
    <>
      <progress max={numQuesion} value={index + Number(answer !== null)} />
      <header className="progress">
        <p>
          Question
          <strong> {index + 1}</strong>/{numQuesion}
        </p>
        <p>
          {points}/<strong> {TotalPoints} points</strong>
        </p>
      </header>
    </>
  );
};
