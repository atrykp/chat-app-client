import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Card from "../../components/Card";
import Button from "../../components/Button";
import InfoBar from "../../components/InfoBar";
import "./LoginScreen.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { loginUser } from "../../thunk-actions/user-thunk-actions";

const LoginScreen = () => {
  const [currentError, setCurrentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const userInfo = useAppSelector((state) => state.user);

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

  useEffect(() => {
    if (userInfo.token) {
      history.push("/conversations");
    } else if (isLoading && !userInfo.token) {
      setCurrentError("Can't log in, please try again");
    }
  }, [userInfo, history, isLoading]);

  const onSubmit = async (data: { email: string; password: string }) => {
    const userData = await loginUser(data);
    await dispatch(userData);
    setIsLoading(true);
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
