import { useRef } from "react";
import { useHistory } from "react-router";
import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./redux-hooks";

export const useLogout = (text = "You have been logged out, try again") => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const logout = (socket?: any) => {
    history.push(`/start/${text}`);
    dispatch(removeUser());
    socket?.disconnect();
  };
  const logoutRef = useRef(logout);
  return logoutRef.current;
};
