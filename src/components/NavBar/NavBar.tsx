import "./NavBar.scss";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";

interface INavBar {
  callback?(): void;
}

const NavBar = ({ callback }: INavBar) => {
  const userInfo = useAppSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();

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
        {location.pathname.includes("contacts") && (
          <div className="search-users" onClick={() => callback?.()}></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
