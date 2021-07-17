import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IUserSlice {
  _id: string;
  userName: string;
  email: string;
  token: string;
}

const initialState: IUserSlice = {
  _id: "",
  userName: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserSlice>) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = initialState;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
