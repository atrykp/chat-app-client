import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppState {
  socket: any;
}

const initialState: IAppState = {
  socket: null,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    createSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    removeSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { createSocket, removeSocket } = appStateSlice.actions;

export default appStateSlice.reducer;
