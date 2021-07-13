interface IListElement {
  img: string;
  header: string;
  text: string;
  status?: "online" | "offline";
}

const ListElement = ({ img, header, text, status }: IListElement) => {
  return (
    <li>
      <div className="user-image"></div>
      <h1>{header}</h1>
      <p>{text}</p>
      {status && <p>{status}</p>}
    </li>
  );
};

export default ListElement;
