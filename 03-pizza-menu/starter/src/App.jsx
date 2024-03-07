// eslint-disable-next-line no-unused-vars
import React from "react";
import { pizzaData } from "./data";

import "./index.css";
import Currency from "./Currency.jsx";

const App = () => {
  return (
    <div className="container">
      {/* <Header />
      <Menu />
      <Footer /> */}
      <Currency />
    </div>
  );
};

const Pizza = ({pizzaObj}) => {
  const { photoName, name, price, ingredients, soldOut } = pizzaObj;


  

  return (
    <li className={`pizza ${soldOut ? "sold-out": ""}`}>
      <img src={photoName} alt="" />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out" : price}</span>
        <p></p>
      </div>
    </li>
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
      <ul className="pizzas">
        {pizzaData.map((pizza, id) => (
          <Pizza key={id} pizzaObj={pizza} />
        ))}
      </ul>
    </main>
  );
}
function Footer() {
  const hour = new Date().getHours()
  const close = 22 
  const open = 10
  const isOpen = hour >= open && hour <= close
  return (
    <div className="footer">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <footer>{isOpen ? `${new Date().toLocaleString()} We're currently Open` : "We are closed"}</footer>
    </div>
  );
}

export default App;
