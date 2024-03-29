import {configureStore} from '@reduxjs/toolkit'
import acountReducer from './features/accounts/AccountSlice';
import customerReducer from './features/customers/CustomerSlice';



const store = configureStore({
  reducer: {
    account: acountReducer,
    customer: customerReducer,
  },
});

export default store

