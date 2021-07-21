import { useHistory } from "react-router";
import "./ListElement.scss";

export interface IListElement {
  img: string;
  username: string;
  text: string;
  status?: "online" | "offline";
  _id?: string;
  path?: string;
}

const ListElement = ({
  img,
  username,
  text,
  status,
  _id,
  path,
}: IListElement) => {
  const history = useHistory();
  return (
    <li
      className="list-element-wrapper"
      onClick={() => history.push(`${path}/${_id}`)}
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
