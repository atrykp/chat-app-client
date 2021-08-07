import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { io } from "socket.io-client";

import { IOnlineUser, updateUsersOnline } from "../store/slices/socketSlice";
import { useEffect, useRef } from "react";
import { useLogout } from "./useLogout";

export const useSocket = () => {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  const socketRef = useRef<any>();

  useEffect(() => {
    if (!userInfo.token) return;

    const socket = io("http://localhost:5000", {
      query: { token: userInfo.token },
    });

    socket.on("connect_error", (err) => {
      logout(socket);
    });

    socket.on("connect", () => {
      console.log("online");
    });

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

    //message

    socket.on("getMessage", (message: any) => {
      console.log("new message");
    });

    socketRef.current = socket;
  }, [userInfo, dispatch]);

  return socketRef.current;
};
