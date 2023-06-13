import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserLoginDataset } from "../../interfaces/configurationInterfaces/userConfigurationInterfaces/userConfigurationInterfaces";
import { API_BASE_URL, commonPrepareHeader } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: commonPrepareHeader,
  }),
  endpoints: ({ mutation }) => ({
    login: mutation<any, IUserLoginDataset>({
      query: (body) => ({
        url: "/configuration/user/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useLoginMutation } = authApi;
