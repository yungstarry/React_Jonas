import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  return (
    <>
      <Counter />
      <Steps />
    </>
  );
};

const Steps = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlenext = () => {
    if (step >= 3) return;
    setStep((step) => step + 1);

    console.log(step);
  };

  const handlePrevious = () => {
    if (step <= 1) return;

    setStep((step) => step - 1);
    console.log(step);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step === 1 ? "active" : ""}`}>1</div>
            <div className={`${step === 2 ? "active" : ""}`}>2</div>
            <div className={`${step === 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Prev
            </button>
            <button
              onClick={handlenext}
              style={{ backgroundColor: "#7953f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
// const month = date.toLocaleDateString("en-us", { month: "short" });
// let day = date.getDate();
// const year = date.getFullYear();

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  const handleStepPlus = () => {
    setStep((step) => step + 1);
  };
  const handleStepMinus = () => {
    setStep((step) => step - 1);
  };
  const handleCountPlus = () => {
    setCount((count) => count + step);
  };
  const handleCountMinus = () => {
    setCount((count) => count - step);
  };
  return (
    <>
      <div className="steps">
        <div style={{ display: "flex" }}>
          <input
            type="range"
            min="0"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />{" "}
          <p>{step}</p>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={handleCountMinus}>-</button>
          <input
            value={count}
            type="number"
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={handleCountPlus}>+</button>
        </div>
        <footer>
          <p>
            {count === 0
              ? `Today is`
              : count >= 1
              ? `${count} day from now is `
              : count < 0
              ? `${Math.abs(count)} day ago is `
              : ""}
            <span>{date.toDateString()}</span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
