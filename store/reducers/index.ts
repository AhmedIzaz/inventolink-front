import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { testApi } from "../queries";

export const rootReducer = combineReducers({
  auth: authReducer,
  [testApi.reducerPath]: testApi.reducer,
});
