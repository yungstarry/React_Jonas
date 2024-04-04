import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReduder from "./features/cart/cartSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReduder
    }
})

export default store