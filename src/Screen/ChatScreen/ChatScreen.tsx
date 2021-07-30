import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import Message from "../../components/Message/Message";
import "./ChatScreen.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Socket } from "dgram";
import { removeUser } from "../../store/slices/userSlice";
import { useLogout } from "../../hooks/useLogout";

type Inputs = {
  textInput: string;
};

interface IChatScreen {
  socket: Socket;
}

interface newMessage {
  _id: string;
  textInput: string;
}

const ChatScreen = ({ socket }: IChatScreen) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const userInfo = useAppSelector((state) => state.user);
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const { id: conversationId } = useParams<{ id: string }>();
  const { receiverName } = useParams<{ receiverName: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isLoading, isError, data } = useQuery("getChat", () =>
    getChat(userInfo.token, conversationId)
  );
  const { authAxiosGet, authAxiosPost } = useAxios(userInfo.token);
  const history = useHistory();
  const logout = useLogout();

  const getChat = async (token: string, id: string) => {
    const { data } = await authAxiosGet(`http://localhost:5000/message/${id}`);
    showMessages(data);
    return data;
  };

  const showMessages = (messages: any) => {
    const messagesList = messages.map((el: any) => {
      return (
        <div ref={scrollRef} key={`div${el._id}`}>
          <Message
            key={el._id}
            message={{ text: el.text, sender: el.sender, date: el.createdAt }}
            main={el.sender === userInfo._id}
          />
        </div>
      );
    });
    setMessagesList(messagesList);
  };

  const createMessage = useCallback(
    (message: any) => {
      return (
        <Message
          key={Math.random().toString()}
          message={{
            text: message.textInput,
            sender: message._id,
            date: new Date().toLocaleDateString(),
          }}
          main={message._id === userInfo._id}
        />
      );
    },
    [userInfo._id]
  );
  const addNewMessage = useCallback(
    (message: newMessage) => {
      setMessagesList([...messagesList, createMessage(message)]);
    },
    [createMessage, messagesList]
  );
  const sendMessage: SubmitHandler<Inputs> = async (data) => {
    addNewMessage({ textInput: data.textInput, _id: userInfo._id });
    try {
      const { data: receiverInfo } = await authAxiosGet(
        `http://localhost:5000/user/username/${receiverName}`
      );

      socket.emit("sendMessage", {
        message: data.textInput,
        receiverId: receiverInfo[0]._id,
        senderId: userInfo._id,
        date: new Date().toLocaleDateString(),
      });

      await authAxiosPost(`http://localhost:5000/message`, {
        conversationId,
        text: data.textInput,
      });
    } catch (error) {
      dispatch(removeUser());
      throw new Error("couldnt send message");
    }
    reset();
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (message) => {
      addNewMessage({ textInput: message.message, _id: message.senderId });
    });
    return () => {
      socket.removeAllListeners("getMessage");
    };
  }, [socket, addNewMessage]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, dispatch, history]);

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
