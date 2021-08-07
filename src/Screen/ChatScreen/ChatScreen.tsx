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

  const scrollRef = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const onlineUsers = useAppSelector((state) => state.socketSlice);

  const { authAxiosGet, authAxiosPut } = useAxios(userInfo.token);
  const logout = useLogout();

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { id: conversationId, receiverName } = useParams<IParams>();

  const { isLoading, isError, data } = useQuery(
    ["getChat", userInfo.token, conversationId],
    () => getChat(conversationId)
  );

  const getChat = async (id: string) => {
    const { data } = await authAxiosGet(`http://localhost:5000/message/${id}`);
    return data;
  };

  const handleUnread = async (messages: IMessage[]) => {
    const readList = messages.filter(
      (element: IMessage) => element.isRead || element.sender === userInfo._id
    );

    const unreadList = messages.filter(
      (element: any) => !element.isRead && element.sender !== userInfo._id
    );
    if (!unreadList.length) return readList;
    const { data } = await authAxiosPut(
      "http://localhost:5000/message",
      unreadList
    );
    return [...readList, ...data];
  };

  const showMessages = useCallback(
    async (messages: IMessage[]) => {
      const updatedMessages: IMessage[] = await handleUnread(messages);
      const messagesList = updatedMessages.map((el: any) => {
        return (
          <div ref={scrollRef} key={`div${el._id}`}>
            <Message
              key={el._id}
              message={{
                text: el.text,
                sender: el.sender,
                conversationId,
                messageDate: convertDate(el.messageDate),
                isRead: el.isRead,
                isSent: el.isSent,
              }}
              main={el.sender === userInfo._id}
            />
          </div>
        );
      });
      setMessagesList(messagesList);
    },
    [userInfo._id]
  );

  const createMessage = useCallback(
    (message: IMessage) => {
      return (
        <Message
          key={Math.random().toString()}
          message={{
            text: message.text,
            sender: message.sender,
            conversationId,
            messageDate: convertDate(Date.now()),
            isRead: message.isRead,
            isSent: message.isSent,
          }}
          main={message.sender === userInfo._id}
        />
      );
    },
    [userInfo._id]
  );

  const addNewMessage = useCallback(
    (message: IMessage) => {
      setMessagesList([...messagesList, createMessage(message)]);
    },
    [createMessage, messagesList]
  );

  const getUserSocketId = (userId: string) => {
    const receiver: IOnlineUser[] = onlineUsers.onlineUsers.filter(
      (element: IOnlineUser) => element.userId === userId
    );
    if (!!receiver.length) return receiver[0].socketId;
  };

  const sendMessage: SubmitHandler<Inputs> = async (data) => {
    const appSocket = getSocket();
    addNewMessage({
      text: data.textInput,
      sender: userInfo._id,
      conversationId,
      isSent: false,
    });

    try {
      const { data: receiverInfo } = await authAxiosGet(
        `http://localhost:5000/user/username/${receiverName}`
      );

      appSocket.emit("sendMessage", {
        conversationId,
        message: data.textInput,
        receiverId: receiverInfo[0]._id,
        receiverSocketId: getUserSocketId(receiverInfo[0]._id),
        senderId: userInfo._id,
        senderSocketId: getUserSocketId(userInfo._id),
      });

      await appSocket.on("messageSent", (message: IMessage) =>
        addNewMessage(message)
      );
    } catch (error) {
      dispatch(removeUser());
      throw new Error("couldnt send message");
    }
    reset();
  };

  useEffect(() => {
    if (data?.length) showMessages(data);
  }, [data, showMessages]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <div className="chat-screen-wrapper">
      <div className="chat-screen-bar">
        <button
          className="chat-bar-button"
          onClick={() => history.push("/conversations")}
        >
          {"<"}
        </button>
        <p className="chat-bar-header">{receiverName}</p>
      </div>
      <div className="chat-screen-conversation">{messagesList}</div>
      <div className="chat-screen-form-wrapper">
        <form
          action=""
          className="chat-screen-form"
          onSubmit={handleSubmit(sendMessage)}
        >
          <input
            className="chat-screen-form-input"
            {...register("textInput", { required: true })}
          ></input>
          <Button styles="send-button">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
