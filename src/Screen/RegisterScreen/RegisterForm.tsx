import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import Button from "../../components/Button";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { registerUser } from "../../thunk-actions/user-thunk-actions";

interface IRegisterForm {
  setCurrentError(data: string): void;
}

const RegisterForm = ({ setCurrentError }: IRegisterForm) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.password && errors.email && errors.name) {
      setCurrentError("incorrect data");
    } else if (errors.name) {
      setCurrentError("incorrect name (minLength: 3) ");
    } else if (errors.password) {
      setCurrentError(
        "incorrect password (minLength: 5, one letter, one number)"
      );
    } else if (errors.email) {
      setCurrentError("incorrect email");
    } else {
      setCurrentError("");
    }
  }, [errors.email, errors.password, errors.name, setCurrentError]);
  const onSubmit = (data: any) => {
    dispatch(registerUser(data));
  };
  return (
    <form
      action=""
      className="register-screen-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("username", {
          required: true,
          minLength: 3,
          validate: (value) => {
            return value.trim().length >= 3;
          },
        })}
        type="text"
        placeholder="Username"
      />
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
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/gm,
        })}
        type="password"
        placeholder="Password"
      />
      <div className="register-screen-buttons">
        <Button type="submit">Register</Button>
        <Button type="button" callback={() => history.push("/login")} secondary>
          Login
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
