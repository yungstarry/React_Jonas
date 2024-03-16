import React, { useReducer } from "react";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyItems: "center",
};
const buttonStyle = {
  padding: "7px",
  fontSize: "26px",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "8px",
};
const initialState = {
  balance: 0,
  loan: 0,
  //ready, active
  status: "ready",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, status: "active" };
      break;
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
      break;
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
      break;
    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
      break;
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: state.loan - state.loan,
        // status: "ready",
      };
      break;
    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
      break;

    default:
      break;
  }
};

const BankReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, status } = state;
  return (
    <>
      <div style={divStyle}>
        <h2>useReducer Bank Account</h2>
        <h4>Balance: {balance || 0}</h4>
        <h4>Loan: {loan}</h4>
      </div>
      <button
        style={buttonStyle}
        onClick={() => dispatch({ type: "openAccount" })}
        disabled={status === "active"}
      >
        Open account
      </button>
      <button
        style={buttonStyle}
        disabled={status != "active"}
        onClick={() => dispatch({ type: "deposit", payload: 150 })}
      >
        Deposit 150
      </button>
      <button
        style={buttonStyle}
        disabled={status != "active"}
        onClick={() => dispatch({ type: "withdraw", payload: 50 })}
      >
        Withdraw 50
      </button>
      <button
        style={buttonStyle}
        disabled={status != "active"}
        onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
      >
        Request a loan of 5000
      </button>
      <button
        style={buttonStyle}
        disabled={status != "active"}
        onClick={() => dispatch({ type: "payLoan" })}
      >
        Pay Loan
      </button>
      <button
        style={buttonStyle}
        disabled={status != "active"}
        onClick={() => dispatch({ type: "closeAccount" })}
      >
        Close account
      </button>
    </>
  );
};

export default BankReducer;
