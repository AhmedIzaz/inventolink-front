import { createSlice } from "@reduxjs/toolkit";

const appUtilitySlice = createSlice({
  name: "appUtilitySlice",
  initialState: {
    pageTitle: "",
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export default appUtilitySlice;

export const { setPageTitle } = appUtilitySlice.actions;
