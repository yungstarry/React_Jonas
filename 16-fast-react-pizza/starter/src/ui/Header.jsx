import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  return (
    <header className=" bg-yellow-500">
      <Link to={"/"}>FAst React Pizza Co.</Link>
      <SearchOrder />
      <p>Eazyyy</p>
    </header>
  );
};

export default Header;
