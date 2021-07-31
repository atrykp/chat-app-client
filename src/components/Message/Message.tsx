import "./Message.scss";

export interface IMessage {
  message: {
    text: string;
    date: string;
    sender: string;
  };
  main?: boolean;
}

const Message = ({ message, main }: IMessage) => {
  return (
    <div className={main ? "message-wrapper-main" : "message-wrapper"}>
      <div className={main ? "message-main" : "message"}>
        <p className="message-text">{message.text}</p>
        <p className="message-date">{message.date}</p>
      </div>
    </div>
  );
};

export default Message;
