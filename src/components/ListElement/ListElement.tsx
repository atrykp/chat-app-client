import "./ListElement.scss";

export interface IListElement {
  img: string;
  username: string;
  text: string;
  status?: "online" | "offline";
  _id?: string;
}

const ListElement = ({ img, username, text, status, _id }: IListElement) => {
  return (
    <li className="list-element-wrapper" onClick={() => console.log(_id)}>
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
