import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";

import "./ListTemplate.scss";

export interface IListTemplate {
  listElements: IListElement[];
}

const ListTemplate = ({ listElements }: IListTemplate) => {
  const list = listElements.map((elem) => (
    <ListElement
      text={elem.text}
      header={elem.header}
      img={elem.img}
      key={elem.header}
    />
  ));
  return (
    <div className="list-template-wrapper">
      <ul>{list}</ul>
    </div>
  );
};

export default ListTemplate;
