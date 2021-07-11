import { useState } from "react";
import Card from "../../components/Card";
import InfoBar from "../../components/InfoBar";
import RegisterForm from "./RegisterForm";
import "./RegisterScreen.scss";

const RegisterScreen = () => {
  const [currentError, setCurrentError] = useState("");

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
