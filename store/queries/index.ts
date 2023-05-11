import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURLEnum } from "../../common/Enums";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLEnum.JSONPlaceholder,
  }),
  endpoints: ({ query }) => ({
    getPosts: query<any, "S" | "t">({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = testApi;
