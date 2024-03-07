import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Currency = () => {
  const [amount, setAmount] = useState(100);
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [converted, setConverted] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCurrencyRate() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
        );
        const data = await res.json();
        const { rates } = data;
        if (firstCurrency === secondCurrency) {
          setConverted(amount);
        }
        setConverted(rates[secondCurrency]);
        setLoading(false);

      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getCurrencyRate();
  }, [amount, firstCurrency, secondCurrency]);

  return (
    <div>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select
          value={firstCurrency}
          onChange={(e) => setFirstCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="NGN">NGN</option>
        </select>
        <select
          value={secondCurrency}
          onChange={(e) => setSecondCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="NGN">NGN</option>
        </select>
      </div>
      <h2>Output</h2>{" "}
      <span>{loading ? <p>loading</p> : <h1>{converted}</h1>}</span>
    </div>
  );
};

export default Currency;
