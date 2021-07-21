import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";

import "./ListTemplate.scss";

export interface IListTemplate {
  listElements: IListElement[];
  path?: string;
}

const ListTemplate = ({ listElements, path }: IListTemplate) => {
  const list = listElements?.map((elem) => (
    <ListElement
      text={elem.text}
      username={elem.username}
      img={elem.img}
      _id={elem._id}
      key={elem.username}
      path={path}
    />
  ));
  return (
    <div className="list-template-wrapper">
      <ul>{list}</ul>
    </div>
  );
};

export default ListTemplate;
