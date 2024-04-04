import React from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getCurrentQuantityById } from "./cartSlice";

const DeleteItem = ({ children, pizzaId }) => {
  const dispatch = useDispatch();

  function handleDeleteItem() {

    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button type={"small"} onClick={handleDeleteItem}>
      {children}
    </Button>
  );
};

export default DeleteItem;
