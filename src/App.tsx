import { io } from "socket.io-client";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const socket = io("http://localhost:5000");
  const getdata = async () => {
    const { data } = await axios.get("http://localhost:5000/");
    console.log(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <h1>Hello, welcome in chat app</h1>
    </div>
  );
}

export default App;
