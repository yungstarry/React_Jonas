import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { increaseItemQuantity, decreaseItemQuantity } from "../cart/cartSlice";



const UpdateItemQuantity = ({pizzaId, currentQuantity}) => {
    const dispatch = useDispatch()

    function AddItemQuantity() {
        dispatch(increaseItemQuantity(pizzaId))
        
    }
    
    function removeItemQuantity() {
        dispatch(decreaseItemQuantity(pizzaId))
    }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type={"round"} onClick={removeItemQuantity}>
        -
      </Button>
      <span className=' text-sm font-medium'>{currentQuantity}</span>
      <Button type={"round"} onClick={AddItemQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity