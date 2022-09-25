import { configureStore } from "@reduxjs/toolkit";

// reducers and actions from local
import authReducer from "./features/authSlice";

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware({ serializableCheck: false });
  // },
  // devTools: true,
});

export default store;
