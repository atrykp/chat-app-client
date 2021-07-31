import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "../../components/Card";
import InfoBar from "../../components/InfoBar";
import { useAppSelector } from "../../hooks/redux-hooks";
import RegisterForm from "./RegisterForm";
import "./RegisterScreen.scss";

const RegisterScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const history = useHistory();
  const [currentError, setCurrentError] = useState("");

  useEffect(() => {
    if (userInfo.token) {
      history.push("/conversations");
    }
  }, [userInfo, history]);

  return (
    <div className="register-screen-wrapper">
      <InfoBar text={currentError} warning isOpen={!!currentError} />
      <Card>
        <p className="register-screen-title">Register</p>
        <RegisterForm setCurrentError={setCurrentError} />
      </Card>
    </div>
  );
};

export default RegisterScreen;
