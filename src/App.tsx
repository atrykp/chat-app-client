import { Redirect, Route, Switch } from "react-router-dom";

import LoginScreen from "./Screen/Login/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import ConversationScreen from "./Screen/ConversationScreen/ConversationScreen";
import ChatScreen from "./Screen/ChatScreen/ChatScreen";
import StartScreen from "./Screen/StartScreen/StartScreen";
import UserScreen from "./Screen/UserScreen/UserScreen";

import { useSocket } from "./hooks/useSocket";

import "./App.scss";
import ContactsScreen from "./Screen/ContactsScreen/ContactsScreen";

function App() {
  const { getSocket } = useSocket();

  return (
    <Switch>
      <Route path="/start/:message?" exact>
        <StartScreen />
      </Route>
      <Route path="/user" exact>
        <UserScreen getSocket={getSocket} />
      </Route>
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
      <Route path="/chat/:id/:receiverName" exact>
        <ChatScreen getSocket={getSocket} />
      </Route>
      <Redirect to="/start" />
    </Switch>
  );
}

export default App;
