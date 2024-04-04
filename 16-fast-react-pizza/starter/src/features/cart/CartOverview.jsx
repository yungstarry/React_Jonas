import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { useSelector } from "react-redux";

function CartOverview() {
  const TotalCartPrice = useSelector(getTotalCartPrice);
  const TotalCartQuantity = useSelector(getTotalCartQuantity);

  if(!TotalCartQuantity) return null
  return (
    <div className=" flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className=" space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{TotalCartQuantity} pizzas</span>
          <span>${TotalCartPrice}</span>
        
        
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
