import { applyMiddleware, combineReducers, createStore } from "redux";
import acountReducer  from "./features/accounts/AccountSlice";
import  customerReducer  from "./features/customers/CustomerSlice";
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'




const rootReducer = combineReducers({
  account: acountReducer,
  customer: customerReducer,
});

const store= createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)))


export default store

