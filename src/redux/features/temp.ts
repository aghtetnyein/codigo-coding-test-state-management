import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthInterface {
  user: any;
}

let initialState: AuthInterface = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      console.log(action.type);

      // store in sessionStorage
      sessionStorage.setItem("auth_user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
    },
    logout: (state) => {
      state = {
        user: {},
      };

      // remove from sessionStorage
      sessionStorage.removeItem("auth_user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
