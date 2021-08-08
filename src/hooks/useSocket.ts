import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { io } from "socket.io-client";

import { IOnlineUser, updateUsersOnline } from "../store/slices/socketSlice";
import { useEffect, useState } from "react";
import { useLogout } from "./useLogout";
import { updateMessages } from "../store/slices/messagesSlice";

export const useSocket = () => {
  const [appSocket, setAppSocket] = useState<any>(null);
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { token: userInfo.token },
    });

    setAppSocket(socket);

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

    socket.emit("getUnread", userInfo._id);
    socket.on("unread", (messages) => dispatch(updateMessages(messages)));

    socket.on("getMessage", (message: any) => {
      console.log("new message");
    });
  }, [userInfo, dispatch]);

  const getSocket = () => appSocket;

  return { getSocket };
};
