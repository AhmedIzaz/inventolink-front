import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: null,
  selectedBusinessUnit: null,
};
const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setSelectedBusinessUnit: (state, action) => {
      state.selectedBusinessUnit = action.payload;
    },
    setAuthSlice: (state, action) => {
      state = action.payload;
    },
  },
});

export default authSlice;
export const { setUserInformation, setSelectedBusinessUnit, setAuthSlice } =
  authSlice.actions;
