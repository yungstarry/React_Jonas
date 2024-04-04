import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { increaseItemQuantity, decreaseItemQuantity } from "../cart/cartSlice";



const UpdateItemQuantity = ({pizzaId}) => {
    const dispatch = useDispatch()

    function AddItemQuantity() {
        dispatch(increaseItemQuantity(pizzaId))
        
    }
    
    function removeItemQuantity() {
        dispatch(decreaseItemQuantity(pizzaId))
    }
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type={"round"} onClick={removeItemQuantity}>
        -
      </Button>
      <Button type={"round"} onClick={AddItemQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity