import { io } from "socket.io-client";
import "./App.scss";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./Screen/Login/LoginScreen";

const socket = io("http://localhost:5000", { autoConnect: false });

function App() {
  const [userId, setUserId] = useState("");
  const inputValue = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => setMsg(msg));
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUserId("");
      }
    });

    socket.on("users", (users) => {
      users.forEach((user: any) => {
        user.self = user.userID === socket.id;
      });
      users = users.sort((a: any, b: any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => {
      socket.off("connect_error");
    };
  }, []);
  useEffect(() => {
    if (!userId) return;
    console.log("eluwina", userId);

    socket.auth = { userId };
    socket.connect();
  }, [userId]);

  const sendMessage = () => {
    socket.emit("chat message", inputValue.current?.value);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
