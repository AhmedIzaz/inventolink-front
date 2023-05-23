import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: null,
};
const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
  },
});

export default authSlice;
export const { setUserInformation } = authSlice.actions;
