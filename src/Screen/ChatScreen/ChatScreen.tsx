import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Message from "../../components/Message/Message";
import "./ChatScreen.scss";

const message = {
  text: "siemanko co tam u ciebie",
  date: new Date().toDateString(),
  sender: "me",
};
const messageTwo = {
  text: "siemanko",
  date: new Date().toDateString(),
  sender: "me",
};
const messageThree = {
  text: "u mnie spoko",
  date: new Date().toDateString(),
  sender: "me",
};

const ChatScreen = () => {
  const history = useHistory();
  return (
    <div className="chat-screen-wrapper">
      <div className="chat-screen-bar">
        <button
          className="chat-bar-button"
          onClick={() => history.push("/conversations")}
        >
          {"<"}
        </button>
        <p className="chat-bar-header">patryko</p>
      </div>
      <div className="chat-screen-conversation">
        <Message message={message} />
        <Message message={messageTwo} main />
        <Message message={messageThree} main />
      </div>
      <div className="chat-screen-form-wrapper">
        <form action="" className="chat-screen-form">
          <input className="chat-screen-form-input"></input>
          <Button styles="send-button">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
