import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("jwtToken");
const initialUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: initialToken || null,
    user: initialUser || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { jwtToken, user } = action.payload;
      state.jwtToken = jwtToken;
      state.user = user;

      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.jwtToken = null;
      state.user = null;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector: 获取 user 对象
export const selectUser = (state) => state.auth.user;

// Selector: 判断是否已登录
export const selectIsAuthenticated = (state) => !!state.auth.user;