import { AppDispatch } from "../store/store";
import axios from "axios";
import { addUser } from "../store/slices/userSlice";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

export const registerUser =
  (userData: IRegister) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/signup",
        userData
      );

      dispatch(
        addUser({
          _id: data._id,
          token: data.token,
          email: data.email,
          username: data.username,
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
        "http://localhost:5000/user/login",
        userData
      );
      dispatch(
        addUser({
          _id: data._id,
          token: data.token,
          email: data.email,
          username: data.username,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
