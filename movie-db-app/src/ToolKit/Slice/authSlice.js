import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null, email: null, isLogin: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
