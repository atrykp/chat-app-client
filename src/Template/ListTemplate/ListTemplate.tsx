import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useLocation } from "react-router";

import "./ListTemplate.scss";

export interface IListTemplate {
  listElements: IListElement[];
  path?: string;
  padding?: boolean;
  headerText?: string;
}

const ListTemplate = ({
  listElements,
  path,
  padding,
  headerText,
}: IListTemplate) => {
  const unread = useAppSelector((state) => state.messagesSlice);
  const location = useLocation();

  const list = listElements?.map((elem) => (
    <ListElement
      text={elem.text}
      username={elem.username}
      img={elem.img}
      conversationId={elem.conversationId}
      key={elem.username}
      path={path}
      unreadNumber={
        location.pathname.search("conversations") !== -1 && elem.conversationId
          ? unread[elem.conversationId]?.length
          : undefined
      }
    />
  ));
  return (
    <div
      className={padding ? "list-template-wrapper-p" : "list-template-wrapper"}
    >
      {headerText && <p className="list-template-header">{headerText}</p>}
      <ul>{list}</ul>
    </div>
  );
};

export default ListTemplate;
