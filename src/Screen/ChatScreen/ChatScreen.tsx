import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../components/Button";
import Message, { IMessage } from "../../components/Message/Message";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useLogout } from "../../hooks/useLogout";
import { useAxios } from "../../hooks/useAxios";

import { removeUser } from "../../store/slices/userSlice";

import "./ChatScreen.scss";
import { convertDate } from "../../utils/convertDate";
import { IOnlineUser } from "../../store/slices/socketSlice";
import { updateMessages } from "../../store/slices/messagesSlice";
import Loader from "../../components/Loader/Loader";

type Inputs = {
  textInput: string;
};

interface IParams {
  id: string;
  receiverName: string;
}

interface IChatScreen {
  getSocket: any;
}

const ChatScreen = ({ getSocket }: IChatScreen) => {
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [receiverInfo, setReceiverInfo] = useState<any>();
  const [isThrottle, setIsThrottle] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [canSend, setCanSend] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();
  const typingTimerId = useRef<NodeJS.Timeout>();
  const sendTimerId = useRef<NodeJS.Timeout>();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const usersOnline = useAppSelector((state) => state.socketSlice.onlineUsers);
  const unread = useAppSelector((state) => state.messagesSlice);
  const onlineUsers = useAppSelector((state) => state.socketSlice);

  const { authAxiosGet } = useAxios(userInfo.token);
  const logout = useLogout();

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { id: conversationId, receiverName } = useParams<IParams>();

  const { isLoading, isError, data, refetch } = useQuery(
    ["getChat", userInfo.token, conversationId],
    async () => {
      const { data } = await authAxiosGet(
        `http://localhost:5000/message/${conversationId}`
      );
      return data;
    },
    { retry: 1, staleTime: 1000 }
  );

  const createMessage = useCallback(
    (message: IMessage) => {
      return (
        <Message
          key={message._id ? message._id : Math.random().toString()}
          message={{
            text: message.text,
            sender: message.sender,
            conversationId,
            messageDate: message.messageDate
              ? convertDate(message.messageDate)
              : convertDate(Date.now()),
            isRead: message.isRead,
            isSent: message.isSent,
          }}
          main={message.sender === userInfo._id}
        />
      );
    },
    [userInfo._id, conversationId]
  );

  const showMessages = useCallback(
    async (messages: IMessage[]) => {
      const messagesList = messages.map((el: any) => {
        return (
          <div ref={scrollRef} key={`div${el._id}`}>
            {createMessage(el)}
          </div>
        );
      });
      setMessagesList(messagesList);
    },
    [createMessage]
  );

  const handleSendMessage = useCallback(
    (message: IMessage) => {
      setMessagesList([...messagesList, createMessage(message)]);
    },
    [createMessage, messagesList]
  );

  const getNewMessages = useCallback(
    (messages: IMessage[]) => {
      const messagesArr = messages.map((el) => createMessage(el));
      setMessagesList([...messagesList, ...messagesArr]);
    },
    [messagesList, createMessage]
  );

  const getUserSocketId = useCallback(
    (userId: string) => {
      const receiver: IOnlineUser[] = onlineUsers.onlineUsers.filter(
        (element: IOnlineUser) => element.userId === userId
      );
      if (!!receiver.length) return receiver[0].socketId;
    },
    [onlineUsers]
  );

  const setThrottle = () => {
    setIsThrottle(true);
    timerId.current = setTimeout(() => {
      setIsThrottle(false);
    }, 500);
  };

  const sendMessage: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setCanSend(false);
      sendTimerId.current = setTimeout(() => {
        setCanSend(true);
      }, 500);
      const appSocket = getSocket();
      handleSendMessage({
        text: data.textInput,
        sender: userInfo._id,
        conversationId,
        isSent: false,
      });

      try {
        if (!receiverInfo) return;
        appSocket.emit("sendMessage", {
          conversationId,
          message: data.textInput,
          receiverId: receiverInfo._id,
          receiverSocketId: getUserSocketId(receiverInfo._id),
          senderId: userInfo._id,
          senderSocketId: getUserSocketId(userInfo._id),
        });
      } catch (error) {
        dispatch(removeUser());
        throw new Error("couldnt send message");
      }
      reset();
    },
    [
      dispatch,
      getSocket,
      getUserSocketId,
      reset,
      conversationId,
      handleSendMessage,
      userInfo._id,
      receiverInfo,
    ]
  );

  const getReceiverInfo = useCallback(async () => {
    const { data: receiverData } = await authAxiosGet(
      `http://localhost:5000/user/username/${receiverName}`
    );
    setReceiverInfo(receiverData[0]);
  }, [receiverName, authAxiosGet]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const appSocket = getSocket();
    if (!appSocket || e.target.value.length <= 2 || isThrottle) return;
    appSocket.emit("writing", {
      socketId: getUserSocketId(receiverInfo._id),
      conversationId,
    });
    setThrottle();
  };

  useEffect(() => {
    getReceiverInfo();
  }, [usersOnline, getReceiverInfo]);

  useEffect(() => {
    if (data?.length) showMessages(data);
  }, [data, showMessages]);

  useEffect(() => {
    const appSocket = getSocket();
    if (appSocket) {
      appSocket.on("displayedMessages", (messages: any) => {
        refetch();
      });
      appSocket.on("messageSent", (message: IMessage) => {
        refetch();
      });
      appSocket.on("typing", (convId: string) => {
        if (convId === conversationId) {
          if (typingTimerId.current) clearTimeout(typingTimerId.current);
          setIsTyping(true);
          typingTimerId.current = setTimeout(() => {
            setIsTyping(false);
          }, 1500);
        }
      });
    }

    return () => {
      if (appSocket) {
        appSocket.off("displayedMessages");
        appSocket.off("messageSent");
      }
    };
  }, [getSocket, refetch, conversationId]);

  useEffect(() => {
    if (isError) {
      logout();
    }
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      if (typingTimerId.current) clearTimeout(typingTimerId.current);
      if (sendTimerId.current) clearTimeout(sendTimerId.current);
    };
  }, [isError, logout]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  useEffect(() => {
    const unreadMessages = unread[conversationId];
    if (unreadMessages) {
      getNewMessages(unreadMessages);
      const appSocket = getSocket();
      const socketId = getUserSocketId(unreadMessages[0].sender);
      appSocket.emit("readMessages", { unreadMessages, socketId });
      const updatedUnread = { ...unread };
      delete updatedUnread[conversationId];
      dispatch(updateMessages(updatedUnread));
      setIsTyping(false);
    }
  }, [
    conversationId,
    dispatch,
    unread,
    getNewMessages,
    getSocket,
    getUserSocketId,
  ]);
  const registerForm = register("textInput", { required: true });

  return (
    <div className="chat-screen-wrapper">
      {isLoading && <Loader />}

      <div className="chat-screen-bar">
        <button
          className="chat-bar-button"
          onClick={() => history.push("/conversations")}
        ></button>
        <p className="chat-bar-header">
          {receiverName}
          <span>
            {receiverInfo?.online === "online"
              ? receiverInfo?.online
              : `last seen: ${convertDate(parseInt(receiverInfo?.online))}`}
          </span>
        </p>
      </div>

      <div className="chat-screen-conversation">
        {messagesList}
        {isTyping && <p className="typing-information">typing...</p>}
      </div>
      <div className="chat-screen-form-wrapper">
        <form
          action=""
          className="chat-screen-form"
          onSubmit={
            canSend ? handleSubmit(sendMessage) : (e) => e.preventDefault()
          }
        >
          <input
            className="chat-screen-form-input"
            {...registerForm}
            onChange={(e) => {
              registerForm.onChange(e);
              handleTyping(e);
            }}
          ></input>
          <Button styles="send-button">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
