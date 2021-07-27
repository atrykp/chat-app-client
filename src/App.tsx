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
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "./hooks/redux-hooks";

function App() {
  const userInfo = useAppSelector((state) => state.user);
  const socketRef = useRef<any>(null);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    if (!userInfo._id) return;
    console.log("zmieniło się user info");

    setSocket(io("http://localhost:5000"));
  }, [userInfo._id]);

  useEffect(() => {
    if (!socket) return;
    socket.on("hello", (message: string) => {
      console.log(message);
    });
    socket.emit("userId", userInfo._id);
    socket.on("usersOnline", (users: { userId: string; socketId: string }[]) =>
      console.log(users)
    );
  }, [socket, userInfo._id]);

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
        <Route path="/chat/:id/:receiverName" exact>
          <ChatScreen socket={socket} />
        </Route>
        <Redirect to="/conversations" />
      </Switch>
    </Router>
  );
}

export default App;
