import Cookies from "js-cookie";

// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthInterface {
  user: {
    username: string | null;
  };
}

const initialState: AuthInterface = {
  user: {
    username: Cookies.get("_un") || null,
  },
};

// Redux Toolkit slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action: PayloadAction<AuthInterface>) => {
      state.user = action.payload.user;
      // store in cookies
      Cookies.set("_un", action.payload.user.username ?? "", {
        expires: 1,
      });
    },
    logout: (state) => {
      console.log("logout");
      state.user.username = null;
      // remove from cookies
      Cookies.remove("_un");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
