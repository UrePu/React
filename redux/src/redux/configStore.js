import { createStore, combineReducers } from "redux";
import counter from "../modules/counter.js";

const rootReducer = combineReducers({
  counter,
});

const store = createStore(rootReducer);

export default store;
