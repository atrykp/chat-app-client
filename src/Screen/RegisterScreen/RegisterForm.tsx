import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import Button from "../../components/Button";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { registerUser } from "../../thunk-actions/user-thunk-actions";

interface IRegisterForm {
  setCurrentError(data: string): void;
}

const RegisterForm = ({ setCurrentError }: IRegisterForm) => {
  const [currentPhoto, setCurrentPhoto] = useState("");
  const history = useHistory();
  const photoRef = useRef<HTMLInputElement>(null);
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
    const photo = photoRef.current?.files ? photoRef.current.files[0] : null;
    dispatch(registerUser(data, photo));
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const name = e.target.value.split("\\");
      setCurrentPhoto(name[name.length - 1]);
    }
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
      <div className="photo-box-input">
        <label htmlFor="avatar">
          Profile picture
          <input
            onChange={handleAddPhoto}
            type="file"
            id="avatar"
            name="avatar"
            ref={photoRef}
            accept="image/png, image/jpeg"
          />
        </label>
        {currentPhoto && (
          <div className="loaded-photo-box">
            <h1>{currentPhoto}</h1>
            <button
              type="button"
              onClick={() => {
                photoRef.current!.value = "";
                setCurrentPhoto("");
              }}
            >
              x
            </button>
          </div>
        )}
      </div>

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
