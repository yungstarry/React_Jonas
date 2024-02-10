import React, { useState } from "react";

const TipCalculator = () => {
  const [amount, setAmount] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = amount * ((percentage1 + percentage2 / 2) / 100);
  console.log(tip);

  const reset = () => {
    setAmount("");
    setPercentage1(0);
    setPercentage2(0);
  };
  return (
    <>
      <Bill amount={amount} onAmount={setAmount} />
      <Service percentage={percentage1} onSetPercentage={setPercentage1}>
        How do you like your service
      </Service>
      <Service percentage={percentage2} onSetPercentage={setPercentage2}>
        How do you like your friend like the service
      </Service>

      {amount > 0 && (
        <>
          <Total amount={amount} onhandleTipCal={tip} />
          <Reset onReset={reset} />
        </>
      )}
    </>
  );
};

const Bill = ({ amount, onAmount }) => {
  return (
    <div>
      <h3>How much was the bill</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmount(Number(e.target.value))}
      />
    </div>
  );
};

const Service = ({ percentage, onSetPercentage, children }) => {
  return (
    <div>
      <h3>{children}</h3>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Expectional (20%)</option>
      </select>
    </div>
  );
};

const Total = ({ amount, onhandleTipCal }) => {
  return (
    <div>
      <h3>
        you pay ${amount + onhandleTipCal} (${amount} + ${onhandleTipCal}tip)
      </h3>
    </div>
  );
};

const Reset = ({ onReset }) => {
  return (
    <div>
      <button onClick={onReset}>reset</button>
    </div>
  );
};

export default TipCalculator;
