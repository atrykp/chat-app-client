import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Card from "../../components/Card";
import Button from "../../components/Button";
import InfoBar from "../../components/InfoBar";
import "./LoginScreen.scss";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { loginUser } from "../../thunk-actions/user-thunk-actions";

const LoginScreen = () => {
  const [currentError, setCurrentError] = useState("");
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.password && errors.email) {
      setCurrentError("incorrect data");
    } else if (errors.password) {
      setCurrentError("password is required");
    } else if (errors.email) {
      setCurrentError("email is required");
    } else {
      setCurrentError("");
    }
  }, [errors.email, errors.password]);

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="login-screen-wrapper">
      <InfoBar text={currentError} warning isOpen={!!currentError} />
      <Card>
        <p className="login-screen-title">Login</p>
        <form
          action=""
          className="login-screen-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", {
              required: true,
            })}
            type="text"
            placeholder="Email"
          />
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="Password"
          />
          <div className="login-screen-buttons">
            <Button type="submit">Login</Button>
            <Button
              type="button"
              callback={() => history.push("/register")}
              secondary
            >
              SignUp
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
