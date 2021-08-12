import { FormEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import ListElement, {
  IListElement,
} from "../../components/ListElement/ListElement";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import NavBar from "../../components/NavBar/NavBar";

import { useAppSelector } from "../../hooks/redux-hooks";
import { useAxios } from "../../hooks/useAxios";
import { useLogout } from "../../hooks/useLogout";

import "./ContactsScreen.scss";
import { useGetConversations } from "../../hooks/useGetConversations";
import { useQuery } from "react-query";

interface IUserElement {
  userName: string;
  profilePicture: string;
  _id: string;
}

const ContactsScreen = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [usersList, setUsersList] = useState<IUserElement[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<IListElement[]>();

  const searchRef = useRef<HTMLInputElement>(null);

  const userInfo = useAppSelector((state) => state.user);
  const onlineArr = useAppSelector((state) => state.socketSlice.onlineUsers);
  const { authAxiosGet, authAxiosPost } = useAxios(userInfo.token);
  const { getConversations } = useGetConversations(
    userInfo.token,
    userInfo._id
  );

  const history = useHistory();
  const logout = useLogout();

  const { isLoading, isError, data } = useQuery(
    "getConversationsList",
    () => getConversations(),
    { retry: false, staleTime: 1000 }
  );

  const showSearchWindow = () => {
    setIsSearchActive((prevValue) => !prevValue);
  };

  const handleSearch = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await authAxiosGet(
        `http://localhost:5000/user/username/${searchRef.current?.value}`
      );
      if (data.length) {
        const users = data.map((element: IUserElement) => {
          const createConversation = async () => {
            const conversation = await authAxiosPost(
              "http://localhost:5000/conversations",
              { member: _id }
            );
            history.push(`chat/${conversation.data._id}/${userName}`);
          };
          const { userName, _id, profilePicture } = element;
          return (
            <ListElement
              key={userName}
              username={userName}
              conversationId={_id}
              img={profilePicture}
              callback={createConversation}
            />
          );
        });
        setUsersList(users);
      } else {
        setUsersList([]);
      }
    } catch (error) {
      logout();
    }
  };
  const closeSearch = () => {
    setIsSearchActive(false);
  };

  useEffect(() => {
    if (isError) logout();
  }, [isError, logout]);

  useEffect(() => {
    if (data && onlineArr) {
      const newArr = data?.filter((element) => {
        let isOnline = false;
        for (let user of onlineArr) {
          if (element._id === user.userId) {
            isOnline = true;
            break;
          }
        }
        return isOnline;
      });
      setOnlineUsers(newArr);
    }
  }, [data, onlineArr]);

  return (
    <>
      <NavBar callback={showSearchWindow} />
      {isSearchActive && (
        <div className="search-background">
          <div className="search-wrapper">
            <button className="close-search-btn" onClick={() => closeSearch()}>
              x
            </button>
            <form action="" className="search-contact-wrapper">
              <input type="text" placeholder="username" ref={searchRef} />
              <button onClick={(e) => handleSearch(e)}>{"->"}</button>
            </form>
            <div className="search-result-wrapper">
              <p>Results:</p>
              <div className="search-results-box">
                {!!usersList.length ? usersList : <h2>empty</h2>}
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          {" "}
          <ListTemplate
            listElements={onlineUsers!}
            path="chat"
            padding
            headerText="online"
          />
          <ListTemplate listElements={data!} path="chat" headerText="all" />
        </>
      )}
    </>
  );
};

export default ContactsScreen;
