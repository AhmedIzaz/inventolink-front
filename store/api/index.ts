import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { isExpired } from "react-jwt";
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://link.invento.com"
    : "http://localhost:4000";

export const commonPrepareHeader = (
  headers: Headers,
  { getState }: { getState: () => any }
): MaybePromise<Headers | void> => {
  const token = getState().authSlice?.userInformation?.token;
  if (token) {
    console.log("token", token);
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export const isTokenExpired = (token: string): boolean => {
  return isExpired(token);
};
