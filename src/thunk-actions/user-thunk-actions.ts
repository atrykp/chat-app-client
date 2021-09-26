import { AppDispatch } from "../store/store";
import axios from "axios";
import { addUser } from "../store/slices/userSlice";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

export const registerUser =
  (userData: IRegister, photoFile: File | null) =>
  async (dispatch: AppDispatch) => {
    try {
      const fData = new FormData();
      if (photoFile) {
        fData.append("file", photoFile);
      }
      fData.append("username", userData.username);
      fData.append("email", userData.email);
      fData.append("password", userData.password);

      const { data } = await axios.post(
        `${
          process.env.REACT_APP_SERVER
            ? process.env.REACT_APP_SERVER
            : "http://localhost:5000"
        }/user/signup`,
        fData
      );

      dispatch(
        addUser({
          _id: data._id,
          token: data.token,
          email: data.email,
          username: data.username,
          profilePicture: data.profilePicture,
          description: data.description,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

interface ILogin {
  email: string;
  password: string;
}
export const loginUser =
  (userData: ILogin) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.post(
        `${
          process.env.REACT_APP_SERVER
            ? process.env.REACT_APP_SERVER
            : "http://localhost:5000"
        }/user/login`,
        userData
      );
      dispatch(
        addUser({
          _id: data._id,
          token: data.token,
          email: data.email,
          username: data.username,
          profilePicture: data.profilePicture,
          description: data.description,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
