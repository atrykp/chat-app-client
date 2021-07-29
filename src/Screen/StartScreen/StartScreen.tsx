import { useHistory } from "react-router";
import Button from "../../components/Button";
import "./StartScreen.scss";

const StartScreen = () => {
  const history = useHistory();
  return (
    <div className="start-screen-wrapper">
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
