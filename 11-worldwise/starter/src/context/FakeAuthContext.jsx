import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, error: "" };
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "error/throw":
      console.log("Error thrown:", action.payload); // Debugging log
      return { ...state, error: action.payload };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, error } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  function throwError(email, password) {
    const errorMessage =
      email && password
        ? "Invalid email or password."
        : "Please enter your email and password.";

    dispatch({ type: "error/throw", payload: errorMessage });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout, throwError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
