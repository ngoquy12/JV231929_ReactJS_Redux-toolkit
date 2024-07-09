import { combineReducers } from "redux";
import userSlice from "./userSlice";
import productSlice from "./productSlice";

const rootReducers = combineReducers({
  user: userSlice,
  product: productSlice,
});

export default rootReducers;
