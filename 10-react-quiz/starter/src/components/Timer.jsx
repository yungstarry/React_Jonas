import React, { useEffect } from "react";

export const Timer = ({ dispatch, secondsRemaining }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return <div className="timer">{secondsRemaining}</div>;
};
