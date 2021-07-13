import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./Screen/Login/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import MainScreen from "./Screen/MainScreen/MainScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainScreen />
        </Route>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
        <Route path="/register" exact>
          <RegisterScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
