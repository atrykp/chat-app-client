import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IUser {
  _id: string;
  userName: string;
  email: string;
  token: string;
}

const initialState: IUser = {
  _id: "",
  userName: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = initialState;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
