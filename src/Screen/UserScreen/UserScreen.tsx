import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import Button from "../../components/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import InfoBar from "../../components/InfoBar";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAxios } from "../../hooks/useAxios";
import { useLogout } from "../../hooks/useLogout";
import { updateUser } from "../../store/slices/userSlice";

import "./UserScreen.scss";

export interface INewData {
  [key: string]: string;
}
interface IUserScreen {
  getSocket: any;
}

const UserScreen = ({ getSocket }: IUserScreen) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);

  const history = useHistory();

  const logout = useLogout("You have been logged out");
  const { authAxiosDelete, authAxiosPut } = useAxios(userInfo.token);

  const removeAccount = async () => {
    try {
      await authAxiosDelete(
        `${
          process.env.REACT_APP_SERVER
            ? process.env.REACT_APP_SERVER
            : "http://localhost:5000"
        }/user`
      );
      logout();
    } catch (error) {
      logout();
    }
  };

  const closeEditModal = () => {
    setIsEdit(false);
  };

  const onSubmit = async (data: any) => {
    try {
      const newData: INewData = {};
      for (let key in data) {
        if (data[key]) {
          newData[key] = data[key];
        }
      }
      const { data: updatedUser } = await authAxiosPut(
        `${
          process.env.REACT_APP_SERVER
            ? process.env.REACT_APP_SERVER
            : "http://localhost:5000"
        }/user`,
        newData
      );

      await dispatch(updateUser(updatedUser));

      setIsEdit(false);
    } catch (error) {
      logout();
    }
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
      <InfoBar
        text="incorrect data"
        warning
        isOpen={!!Object.keys(errors).length && isEdit}
      />
      {isEdit && (
        <div className="user-screen-edit-wrapper">
          <div className="user-screen-edit">
            <form
              action=""
              className="register-screen-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("email", {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                type="text"
                placeholder="Email"
                defaultValue={userInfo.email}
              />
              <input
                {...register("description", { minLength: 1, required: true })}
                type="text"
                placeholder="Description"
                defaultValue={userInfo.description}
              />
              <input
                {...register("password", {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/gm,
                })}
                type="password"
                placeholder="New Password"
              />
              <Button callback={() => handleSubmit(onSubmit)}>save</Button>
            </form>
            <Button secondary callback={() => closeEditModal()}>
              close
            </Button>
          </div>
        </div>
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
        <p onClick={() => setIsEdit(true)}>edit data</p>
      </div>
      <div className="user-screen-buttons">
        <Button callback={() => logout(getSocket())}>Logout</Button>
        <Button styles="user-screen-remove" callback={() => setIsConfirm(true)}>
          Remove Account
        </Button>
      </div>
    </div>
  );
};

export default UserScreen;
