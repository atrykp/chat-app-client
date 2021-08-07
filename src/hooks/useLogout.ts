import { useHistory } from "react-router";
import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./redux-hooks";

export const useLogout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const logout = (socket?: any) => {
    history.push("/");
    dispatch(removeUser());
    socket?.disconnect();
  };
  return logout;
};
