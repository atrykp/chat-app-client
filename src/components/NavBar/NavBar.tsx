import "./NavBar.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <h1>Chat App</h1>
      <div className="navbar-links-wrapper">
        <NavLink className="navbar-link" to="/">
          Chats
        </NavLink>
        <NavLink className="navbar-link" to="contacts">
          contacts
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
