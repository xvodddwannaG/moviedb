import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducer";

export const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
