import "./Message.scss";

export interface IMessage {
  message: {
    text: string;
    date: string;
    sender: string;
    isRead: boolean;
  };
  main?: boolean;
}

const Message = ({ message, main }: IMessage) => {
  return (
    <div className={main ? "message-wrapper-main" : "message-wrapper"}>
      <div className={main ? "message-main" : "message"}>
        <p className="message-text">{message.text}</p>
        <div className="message-info-wrapper">
          <p className="message-date">{message.date}</p>
          {main && (
            <div
              className={
                message.isRead ? "message-status-read" : "message-status-unread"
              }
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
