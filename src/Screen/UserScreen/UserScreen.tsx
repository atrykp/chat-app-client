import { useState } from "react";
import { useHistory } from "react-router";

import Button from "../../components/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { useAppSelector } from "../../hooks/redux-hooks";
import { useAxios } from "../../hooks/useAxios";
import { useLogout } from "../../hooks/useLogout";

import "./UserScreen.scss";

const UserScreen = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const userInfo = useAppSelector((state) => state.user);
  const history = useHistory();
  const logout = useLogout();
  const { authAxiosDelete } = useAxios(userInfo.token);

  const removeAccount = async () => {
    await authAxiosDelete("http://localhost:5000/user");
    logout();
  };
  return (
    <div className="user-screen-wrapper">
      {isConfirm && (
        <ConfirmModal
          text="Are you sure?"
          confirmCallback={removeAccount}
          closeCallback={() => setIsConfirm(false)}
        />
      )}

      <div className="user-screen-header">
        <p>hello {userInfo.username}!</p>
        <button
          className="user-screen-backBtn"
          onClick={() => history.goBack()}
        ></button>
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
        <Button callback={() => logout()}>Logout</Button>
        <Button styles="user-screen-remove" callback={() => setIsConfirm(true)}>
          Remove Account
        </Button>
      </div>
    </div>
  );
};

export default UserScreen;
