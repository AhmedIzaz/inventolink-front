import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../queries";
import authSlice from "./configurationSlices/authSlice";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authSlice.reducer,
});
