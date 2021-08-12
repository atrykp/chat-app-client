import { useRef } from "react";
import { useHistory } from "react-router";
import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./redux-hooks";

export const useLogout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const logout = (socket?: any) => {
    history.push("/start/You have been logged out, try again");
    dispatch(removeUser());
    socket?.disconnect();
  };
  const logoutRef = useRef(logout);
  return logoutRef.current;
};
