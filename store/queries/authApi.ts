import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MenuItem } from "../../common/Layout/MainNavigationLayout";
import { IUserLoginDataset } from "../../interfaces/configurationInterfaces/userConfigurationInterfaces/userConfigurationInterfaces";
import { getIconForMenu } from "../../utils/iconUtils";
import { API_BASE_URL, commonPrepareHeader } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: commonPrepareHeader,
  }),
  endpoints: ({ mutation, query }) => ({
    login: mutation<any, IUserLoginDataset>({
      query: (body) => ({
        url: "/configuration/user/login",
        method: "POST",
        body,
      }),
    }),

    getPermittedMenus: query<
      MenuItem[],
      { user_id?: number; business_unit_id?: number }
    >({
      query: (body) => ({
        url: `/configuration/user/user-permitted-menu?user_id=${
          body?.user_id || 0
        }&business_unit_id=${body?.business_unit_id || 0}`,
        method: "GET",
      }),
      transformResponse: (response: MenuItem[]) => {
        return response?.map((item) => ({
          ...item,
          icon: getIconForMenu(item?.label),
        }));
      },
    }),
  }),
});
export const { useLoginMutation, useGetPermittedMenusQuery } = authApi;
