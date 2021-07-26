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
import { useAppSelector } from "./hooks/redux-hooks";

function App() {
  const userInfo = useAppSelector((state) => state.user);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!userInfo._id) return;
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("hello", (message: string) => {
      console.log(message);
    });
    socketRef.current.emit("userId", userInfo._id);
    socketRef.current.on(
      "usersOnline",
      (users: { userId: string; socketId: string }[]) => console.log(users)
    );
  }, [userInfo._id]);

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
