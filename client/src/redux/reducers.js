import { combineReducers } from "redux";
import auth from "./auth";
import employees from "./employees";
const rootReducer = combineReducers({
  auth,
  employees,
});

export default rootReducer;
