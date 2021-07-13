import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";

import "./ListTemplate.scss";

export interface IListTemplate {
  listElements: IListElement[];
}

const ListTemplate = ({ listElements }: IListTemplate) => {
  const list = listElements.map((elem) => (
    <ListElement text={elem.text} header={elem.header} img={elem.img} />
  ));
  return <ul>{list}</ul>;
};

export default ListTemplate;
