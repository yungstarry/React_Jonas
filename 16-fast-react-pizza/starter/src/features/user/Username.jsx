import React from "react";
import { useSelector } from "react-redux";

const Username = () => {
   const {username}=  useSelector((state) => state.user)
   console.log(username);
  return <div className="hidden text-sm font-semibold md:block ">{username || "UserName"}</div>;
};

export default Username;



