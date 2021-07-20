import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  token: string;
  profilePicture: string;
  description: string;
}

const initialState: IUser = {
  _id: "",
  username: "",
  email: "",
  token: "",
  profilePicture: "",
  description: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
      state.description = action.payload.description;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state = initialState;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
