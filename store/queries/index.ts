import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
8;
import { API_BASE_URL, commonPrepareHeader } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: commonPrepareHeader,
  }),
  endpoints: ({ mutation }) => ({}),
});
export const {} = authApi;
