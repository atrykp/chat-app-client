import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../components/Message/Message";

interface IMessageSlice {
  [key: string]: IMessage[];
}

interface IAddMessage {
  conversationId: string;
  message: IMessage;
}

const initialState: IMessageSlice = {};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IAddMessage>) => {
      state[action.payload.conversationId].push(action.payload.message);
    },
    updateMessages: (state, action: PayloadAction<IMessageSlice>) => {
      return { ...action.payload };
    },
  },
});

export const { addMessage, updateMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
