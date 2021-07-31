import { useHistory } from "react-router";
import { removeSocket } from "../store/slices/appStateSlice";
import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

export const useLogout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.appState.socket);

  const logout = () => {
    dispatch(removeUser());
    socket.disconnect();
    dispatch(removeSocket());
    history.push("/");
  };
  return logout;
};
