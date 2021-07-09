import { io } from "socket.io-client";
import "./App.css";
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
      console.log("-------------", users);
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
      <div className="App">
        <h1>Hello, welcome in chat app</h1>
        <p>{msg}</p>
        <input type="text" ref={inputValue} />
        <button onClick={sendMessage}>send</button>
      </div>
      <Switch>
        <Route path="/login" exact>
          <LoginScreen setUserId={setUserId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
