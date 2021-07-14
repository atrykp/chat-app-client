import React from "react";
import Button from "../../components/Button";
import "./ChatScreen.scss";

const ChatScreen = () => {
  return (
    <div className="chat-screen-wrapper">
      <div className="chat-screen-bar"></div>
      <div className="chat-screen-conversation"></div>
      <div className="chat-screen-form">
        <input className="chat-screen-form-input"></input>
        <Button styles="send-button">Send</Button>
      </div>
    </div>
  );
};

export default ChatScreen;
