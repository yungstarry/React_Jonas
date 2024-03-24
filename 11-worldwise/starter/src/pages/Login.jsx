import { Link, NavLink } from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth } from "../context/FakeAuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const{user, isAuthenticated, login, logout} = useAuth()

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSumbit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <NavLink to="/login" className="cta">
            Login
          </NavLink>
        </div>
      </form>
    </main>
  );
}
