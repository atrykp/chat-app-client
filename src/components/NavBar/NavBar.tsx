import "./NavBar.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";

const NavBar = () => {
  const userInfo = useAppSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className="navbar-wrapper">
      <h1>Chat App</h1>
      <div
        className="navbar-user-icon"
        onClick={() => history.push(`${userInfo._id ? "/user" : "/"}`)}
      ></div>
      <div className="navbar-links-wrapper">
        <NavLink className="navbar-link" to="/conversations">
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
