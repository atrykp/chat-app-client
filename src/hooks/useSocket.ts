import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { io } from "socket.io-client";

import { IOnlineUser, updateUsersOnline } from "../store/slices/socketSlice";

export const useSocket = () => {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userInfo._id) return;
    const socket = io("http://localhost:5000");

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on("hello", (message: string) => {
      console.log(message);
    });

    // add user to online users array
    socket.emit("userId", userInfo._id);
    socket?.on("usersOnline", (users: IOnlineUser[]) => {
      dispatch(updateUsersOnline(users));
    });
  }, [userInfo._id, dispatch]);
};
