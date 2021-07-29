import { useHistory } from "react-router";
import Button from "../../components/Button";
import { useAppSelector } from "../../hooks/redux-hooks";
import "./UserScreen.scss";

const UserScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className="user-screen-wrapper">
      <div className="user-screen-header">
        <p>hello {userInfo.username}!</p>
      </div>
      <div className="user-screen-data">
        <p>
          username: <span>{userInfo.username}</span>
        </p>
        <p>
          email: <span>{userInfo.email}</span>
        </p>
        <p>
          description: <span>{userInfo.description}</span>
        </p>
        <p>
          password: <span>****</span>
        </p>
      </div>
      <div className="user-screen-buttons">
        <Button>Logout</Button>
        <Button styles="user-screen-remove">Remove Account</Button>
      </div>
    </div>
  );
};

export default UserScreen;
