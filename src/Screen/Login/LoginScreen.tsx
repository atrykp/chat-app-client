import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../../components/Card";
import InfoBar from "../../components/InfoBar";
import "./LoginScreen.scss";

const LoginScreen = () => {
  const [currentError, setCurrentError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.password && errors.email) {
      setCurrentError("incorrect data");
    } else if (errors.password) {
      setCurrentError("incorrect password");
    } else if (errors.email) {
      setCurrentError("incorrect email");
    } else {
      setCurrentError("");
    }
  }, [errors.email, errors.password]);

  const onSubmit = (data: any) => console.log(data);

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
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            type="text"
            placeholder="Email"
          />
          <input
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
            })}
            type="password"
            placeholder="Password"
          />
          <div className="login-screen-buttons">
            <button className="login-screen-primary" type="submit">
              Login
            </button>
            <button className="login-screen-secondary">SignUp</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
