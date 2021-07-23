import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import profile from "../../images/profile.jpg";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

import "./ContactsScreen.scss";

const contacts = [{ username: "John", text: "hello im new", img: profile }];

const ContactsScreen = () => {
  const [isSearchActive, setIsSearchActive] = useState(true);
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
              <input type="text" placeholder="username" />
              <button>{"->"}</button>
            </form>
            <div className="search-result-wrapper">
              <p>Results:</p>
              <div className="search-results-box"></div>
            </div>
          </div>
        </div>
      )}

      <ListTemplate listElements={contacts}></ListTemplate>
    </>
  );
};

export default ContactsScreen;
