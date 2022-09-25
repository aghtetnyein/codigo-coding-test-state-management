import { configureStore } from "@reduxjs/toolkit";

// reducers and actions from local
import authReducer from "./features/authSlice";
import teamReducer from "./features/teamSlice";
import teamModalReducer from "./features/teamModalSlice";
import playerReducer from "./features/playerSlice";

const reducer = {
  auth: authReducer,
  team: teamReducer,
  teamModal: teamModalReducer,
  player: playerReducer,
};

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware({ serializableCheck: false });
  // },
  // devTools: true,
});

export default store;
