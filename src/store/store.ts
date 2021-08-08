import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import userReducer from "../store/slices/userSlice";
import socketSlice from "./slices/socketSlice";
import messagesSlice from "./slices/messagesSlice";

const reducers = combineReducers({
  user: userReducer,
  socketSlice: socketSlice,
  messagesSlice: messagesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["socketSlice", "messagesSlice"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
