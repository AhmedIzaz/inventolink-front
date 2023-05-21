import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { authApi } from "../queries/authApi";

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});
