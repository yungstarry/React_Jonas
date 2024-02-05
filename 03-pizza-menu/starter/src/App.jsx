// eslint-disable-next-line no-unused-vars
import React from "react";
import { pizzaData } from "./data";

import "./index.css";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Pizza = ({ name, photoName, price } = pizzaObj) => {
  return (
    <div className="pizza">
      <img src={photoName} alt="" />
      <div>
        <h3>{name}</h3>
        <h3>{name}</h3>
        <h3>{price}</h3>
        <p></p>
      </div>
    </div>
  );
};

function Header() {
  return (
    <div>
      <header className="header">
        <h1 style={{ color: "rebeccapurple" }}>Fast React Company</h1>
      </header>
    </div>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.map((pizza, id) => (
        <Pizza pizzaObj={pizza} />
      ))}
    </main>
  );
}
function Footer() {
  return (
    <div className="footer">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <footer>{new Date().toLocaleString()} We're currently Open</footer>
    </div>
  );
}

export default App;
