import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginScreen from "./Screen/Login/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";

import ContactsScreen from "./Screen/ContactsScreen/ContactsScreen";
import ConversationScreen from "./Screen/ConversationScreen/ConversationScreen";
import ChatScreen from "./Screen/ChatScreen/ChatScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
        <Route path="/register" exact>
          <RegisterScreen />
        </Route>
        <Route path="/contacts" exact>
          <ContactsScreen />
        </Route>
        <Route path="/conversations" exact>
          <ConversationScreen />
        </Route>
        <Route path="/chat" exact>
          <ChatScreen />
        </Route>
        <Redirect to="/conversations" />
      </Switch>
    </Router>
  );
}

export default App;
