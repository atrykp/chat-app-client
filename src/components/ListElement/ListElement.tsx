import { useHistory } from "react-router";
import "./ListElement.scss";

export interface IListElement {
  img: string;
  username: string;
  text?: string;
  status?: "online" | "offline";
  conversationId?: string;
  path?: string;
  callback?(): void;
  _id?: string;
  unreadNumber?: number;
}

const ListElement = ({
  img,
  username,
  text,
  status,
  conversationId,
  path,
  callback,
  unreadNumber,
}: IListElement) => {
  const history = useHistory();

  return (
    <li
      className="list-element-wrapper"
      onClick={() =>
        callback
          ? callback()
          : history.push(`${path}/${conversationId}/${username}`)
      }
    >
      <div className="list-element-image">
        <div
          className="user-image"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>

      <h1 className="list-element-header">{username}</h1>
      <p className="list-element-paragraph">{text}</p>
      {unreadNumber && <div className="list-element-new">{unreadNumber}</div>}
      {status && <p>{status}</p>}
    </li>
  );
};

export default ListElement;
