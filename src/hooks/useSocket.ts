import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { io } from "socket.io-client";
import { IUserOnline } from "../Screen/ContactsScreen/ContactsScreen";

const useSocket = () => {
  const [onlineList, setOnlineList] = useState<any[]>([]);
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
    socket?.on("usersOnline", (users: IUserOnline[]) => {
      setOnlineList(users);
    });
    socket.emit("userId", userInfo._id);
  }, [userInfo._id, dispatch]);
};
