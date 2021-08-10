import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { io } from "socket.io-client";

import { IOnlineUser, updateUsersOnline } from "../store/slices/socketSlice";
import { useEffect, useState } from "react";
import { useLogout } from "./useLogout";
import { addMessage, updateMessages } from "../store/slices/messagesSlice";
import { IMessage } from "../components/Message/Message";

export const useSocket = () => {
  const [appSocket, setAppSocket] = useState<any>(null);
  const userInfo = useAppSelector((state) => state.user);
  const unreadMessages = useAppSelector((state) => state.messagesSlice);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  useEffect(() => {
    if (!userInfo._id) return;
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
      console.log(users);

      dispatch(updateUsersOnline(users));
    });

    //message

    socket.emit("getUnread", userInfo._id);
    socket.on("unread", (messages) => dispatch(updateMessages(messages)));
  }, [userInfo, dispatch, logout]);

  useEffect(() => {
    if (!appSocket) return;
    appSocket.off("getMessage");
    appSocket.on("getMessage", (message: IMessage) => {
      if (unreadMessages[message.conversationId]) {
        dispatch(
          addMessage({ conversationId: message.conversationId, message })
        );
      } else {
        const updatedMessages: any = { ...unreadMessages };
        updatedMessages[message.conversationId] = [message];
        dispatch(updateMessages({ ...updatedMessages }));
      }
    });
  }, [unreadMessages, appSocket, dispatch]);

  const getSocket = () => appSocket;

  return { getSocket };
};
