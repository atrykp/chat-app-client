import { FormEvent, useRef, useState } from "react";
import ListElement from "../../components/ListElement/ListElement";
import NavBar from "../../components/NavBar/NavBar";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useAxios } from "../../hooks/useAxios";
import profile from "../../images/profile.jpg";
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
  const { authAxiosGet } = useAxios(userInfo.token);
  const [usersList, setUsersList] = useState<IUserElement[]>([]);

  const handleSearch = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data } = await authAxiosGet(
      `http://localhost:5000/user/username/${searchRef.current?.value}`
    );
    if (!!data.length) {
      const users = data.map((element: IUserElement) => {
        const { userName, _id, profilePicture } = element;
        return (
          <ListElement
            key={userName}
            username={userName}
            conversationId={_id}
            img={profilePicture}
          />
        );
      });
      setUsersList(users);
    } else {
      setUsersList([]);
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
