import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";

import "./ListTemplate.scss";

export interface IListTemplate {
  listElements: IListElement[];
}

const ListTemplate = ({ listElements }: IListTemplate) => {
  const list = listElements?.map((elem) => (
    <ListElement
      text={elem.text}
      username={elem.username}
      img={elem.img}
      _id={elem._id}
      key={elem.username}
    />
  ));
  return (
    <div className="list-template-wrapper">
      <ul>{list}</ul>
    </div>
  );
};

export default ListTemplate;
