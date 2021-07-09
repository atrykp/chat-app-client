import React, { useRef } from "react";
import { useHistory } from "react-router";

interface ILoginScreen {
  setUserId(data: string): void;
}

const LoginScreen = ({ setUserId }: ILoginScreen) => {
  const history = useHistory();
  const inputValue = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1>user Id</h1>
      <input type="text" ref={inputValue} />
      <button
        onClick={() => {
          setUserId(inputValue.current?.value!);
          history.push("/");
        }}
      >
        create user
      </button>
    </div>
  );
};

export default LoginScreen;
