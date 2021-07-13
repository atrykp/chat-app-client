import "./ListElement.scss";

export interface IListElement {
  img: string;
  header: string;
  text: string;
  status?: "online" | "offline";
}

const ListElement = ({ img, header, text, status }: IListElement) => {
  return (
    <li className="list-element-wrapper">
      <div className="list-element-image">
        <div
          className="user-image"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>

      <h1 className="list-element-header">{header}</h1>
      <p className="list-element-paragraph">{text}</p>
      {status && <p>{status}</p>}
    </li>
  );
};

export default ListElement;
