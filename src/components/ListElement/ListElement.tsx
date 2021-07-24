import { useHistory } from "react-router";
import { callbackify } from "util";
import "./ListElement.scss";

export interface IListElement {
  img: string;
  username: string;
  text?: string;
  status?: "online" | "offline";
  conversationId?: string;
  path?: string;
  callback?(): void;
}

const ListElement = ({
  img,
  username,
  text,
  status,
  conversationId,
  path,
  callback,
}: IListElement) => {
  const history = useHistory();
  return (
    <li
      className="list-element-wrapper"
      onClick={() =>
        callback ? callback() : history.push(`${path}/${conversationId}`)
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
      {status && <p>{status}</p>}
    </li>
  );
};

export default ListElement;
