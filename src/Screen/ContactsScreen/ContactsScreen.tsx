import { FormEvent, useRef, useState } from "react";
import { useHistory } from "react-router";
import ListElement from "../../components/ListElement/ListElement";
import NavBar from "../../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAxios } from "../../hooks/useAxios";
import profile from "../../images/profile.jpg";
import { removeUser } from "../../store/slices/userSlice";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

import "./ContactsScreen.scss";

const contacts = [{ username: "John", text: "hello im new", img: profile }];
interface IUserElement {
  userName: string;
  profilePicture: string;
  _id: string;
}
const ContactsScreen = () => {
  const [isSearchActive, setIsSearchActive] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const userInfo = useAppSelector((state) => state.user);
  const { authAxiosGet, authAxiosPost } = useAxios(userInfo.token);
  const [usersList, setUsersList] = useState<IUserElement[]>([]);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSearch = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await authAxiosGet(
        `http://localhost:5000/user/username/${searchRef.current?.value}`
      );
      if (!!data.length) {
        const users = data.map((element: IUserElement) => {
          const createConversation = async () => {
            const conversation = await authAxiosPost(
              "http://localhost:5000/conversations",
              { member: _id }
            );
            history.push(`chat/${conversation.data._id}`);
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
      dispatch(removeUser());
      history.push("/");
    }
  };
  const closeSearch = () => {
    setIsSearchActive(false);
  };
  return (
    <>
      <NavBar />
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

      <ListTemplate listElements={contacts}></ListTemplate>
    </>
  );
};

export default ContactsScreen;
