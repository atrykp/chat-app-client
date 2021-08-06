import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOnlineUser {
  socketId: string;
  userId: string;
}

interface ISocketSlice {
  onlineUsers: IOnlineUser[];
}

const initialState: ISocketSlice = {
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    updateUsersOnline: (state, action: PayloadAction<IOnlineUser[]>) => {
      state.onlineUsers = [...action.payload];
    },
  },
});

export const { updateUsersOnline } = socketSlice.actions;

export default socketSlice.reducer;
