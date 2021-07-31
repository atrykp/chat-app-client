import { useEffect } from "react";
import { io } from "socket.io-client";
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
import StartScreen from "./Screen/StartScreen/StartScreen";
import UserScreen from "./Screen/UserScreen/UserScreen";

import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";

import "./App.scss";
import { createSocket } from "./store/slices/appStateSlice";

function App() {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userInfo._id) return;

    const socket = io("http://localhost:5000");
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on("hello", (message: string) => {
      console.log(message);
    });

    socket.emit("userId", userInfo._id);

    socket.on("usersOnline", (users: { userId: string; socketId: string }[]) =>
      console.log(users)
    );
    dispatch(createSocket(socket));
  }, [userInfo._id, dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <StartScreen />
        </Route>
        <Route path="/user" exact>
          <UserScreen />
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
          <ChatScreen />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
