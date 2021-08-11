import "./Message.scss";

export interface IMessage {
  text: string;
  conversationId: string;
  sender: string;
  messageDate?: string | number;
  isRead?: boolean;
  isSent?: boolean;
  _id?: string;
}
export interface IMessageObj {
  message: IMessage;
  main?: boolean;
}

const Message = ({ message, main }: IMessageObj) => {
  return (
    <div className={main ? "message-wrapper-main" : "message-wrapper"}>
      <div className={main ? "message-main" : "message"}>
        <p className={main ? "message-text-main" : "message-text"}>
          {message.text}
        </p>
        <div
          className={
            main ? "message-info-wrapper-main" : "message-info-wrapper"
          }
        >
          <p className={main ? "message-date-main" : "message-date"}>
            {message.messageDate}
          </p>
          {main && (
            <div
              className={
                message.isSent
                  ? message.isRead
                    ? "message-status-read"
                    : "message-status-unread"
                  : "message-status-unsent"
              }
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
