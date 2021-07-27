import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import Message from "../../components/Message/Message";
import "./ChatScreen.scss";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Socket } from "dgram";

type Inputs = {
  textInput: string;
};

interface IChatScreen {
  socket: Socket;
}

const ChatScreen = ({ socket }: IChatScreen) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const userInfo = useAppSelector((state) => state.user);
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const { id: conversationId } = useParams<{ id: string }>();
  const { receiverName } = useParams<{ receiverName: string }>();
  const { isLoading, isError, data } = useQuery("getChat", () =>
    getChat(userInfo.token, conversationId)
  );
  const { authAxiosGet, authAxiosPost } = useAxios(userInfo.token);
  const history = useHistory();

  const getChat = async (token: string, id: string) => {
    const { data } = await authAxiosGet(`http://localhost:5000/message/${id}`);
    showMessages(data);
    return data;
  };

  const showMessages = (messages: any) => {
    const messagesList = messages.map((el: any) => {
      return (
        <Message
          key={el._id}
          message={{ text: el.text, sender: el.sender, date: el.createdAt }}
          main={el.sender === userInfo._id}
        />
      );
    });
    setMessagesList(messagesList);
  };

  const createMessage = (message: any) => {
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
  };
  const sendMessage: SubmitHandler<Inputs> = async (data) => {
    const currentMessage = { ...data, _id: userInfo._id };
    setMessagesList([...messagesList, createMessage(currentMessage)]);

    try {
      await authAxiosPost(`http://localhost:5000/message`, {
        conversationId,
        text: data.textInput,
      });
    } catch (error) {
      throw new Error("couldnt send message");
    }
    reset();
  };

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
