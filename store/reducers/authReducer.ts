import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {
    setIsAuth: (state: any, action: any) => {
      state.isAuth = action.payload;
    },
  },
});


export default authSlice.reducer