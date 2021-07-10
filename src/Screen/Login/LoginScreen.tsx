import React, { useRef } from "react";
import { useHistory } from "react-router";
import Card from "../../components/Card";
import style from "./LoginScreen.module.css";

interface ILoginScreen {
  setUserId(data: string): void;
}

const LoginScreen = ({ setUserId }: ILoginScreen) => {
  const history = useHistory();
  const inputValue = useRef<HTMLInputElement>(null);
  return (
    <div className={style.wrapper}>
      <Card>
        <p className={style.title}>Login</p>
        <form action="" className={style.form}>
          <input type="text" placeholder="Eail" />
          <input type="text" placeholder="Password" />
          <div className={style.buttons}>
            <button className={style.primary}>Login</button>
            <button className={style.secondary}>SignUp</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
