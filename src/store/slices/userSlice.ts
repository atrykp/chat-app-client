import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INewData } from "../../Screen/UserScreen/UserScreen";

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
    updateUser: (state, action: PayloadAction<INewData>) => {
      return { ...state, ...action.payload };
    },
    removeUser: (state) => {
      state._id = initialState._id;
      state.username = initialState.username;
      state.email = initialState.email;
      state.profilePicture = initialState.profilePicture;
      state.description = initialState.description;
      state.token = initialState.token;
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
