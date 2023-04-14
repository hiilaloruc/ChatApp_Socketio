import "./App.css";
import Room from "./components/Room";
import Chat from "./components/Chat";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:7000");

function App() {
  const [username, setUsername] = useState("");
  const [roomkey, setRoomkey] = useState("");
  const [onChatScreen, setOnChatScreen] = useState(false);

  return (
    <div className="App comfortaa-font">
      {!onChatScreen ? (
        <Room
          username={username}
          setUsername={setUsername}
          roomkey={roomkey}
          setRoomkey={setRoomkey}
          setOnChatScreen={setOnChatScreen}
          socket={socket}
        />
      ) : (
        <Chat socket={socket} username={username} roomkey={roomkey} />
      )}
    </div>
  );
}

export default App;
