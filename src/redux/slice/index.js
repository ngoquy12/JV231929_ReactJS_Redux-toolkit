import { combineReducers } from "redux";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";

const rootReducers = combineReducers({
  user: userSlice,
  product: productSlice,
  auth: authSlice,
});

export default rootReducers;
