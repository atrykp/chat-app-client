import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
