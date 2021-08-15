import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

import Button from "../../components/Button";
import InfoBar from "../../components/InfoBar";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeUser } from "../../store/slices/userSlice";
import "./StartScreen.scss";

const StartScreen = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { message } = useParams<{ message: string | undefined }>();

  useEffect(() => {
    localStorage.clear();
    dispatch(removeUser());
  }, [dispatch]);

  return (
    <div className="start-screen-wrapper">
      {message && <InfoBar text={message} warning isOpen />}
      <p className="start-screen-header">ChatApp</p>
      <Button callback={() => history.push("/login")}>Login</Button>
      <p className="start-screen-paragraph">or</p>
      <Button
        styles="start-screen-signup"
        callback={() => history.push("/register")}
      >
        SignUp
      </Button>
    </div>
  );
};

export default StartScreen;
