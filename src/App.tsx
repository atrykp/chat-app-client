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
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { Socket } from "dgram";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

function App() {
  const socketRef = useRef<any>(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("hello", (message: string) => console.log(message));
  }, []);
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
        <Route path="/chat/:id" exact>
          <ChatScreen socket={socketRef.current} />
        </Route>
        <Redirect to="/conversations" />
      </Switch>
    </Router>
  );
}

export default App;
