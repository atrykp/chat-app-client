import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import "./ChatScreen.scss";

const ChatScreen = () => {
  const history = useHistory();
  return (
    <div className="chat-screen-wrapper">
      <div className="chat-screen-bar">
        <button className="chat-bar-button" onClick={() => history.goBack()}>
          {"<"}
        </button>
        <p className="chat-bar-header">patryko</p>
      </div>
      <div className="chat-screen-conversation"></div>
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
