import "./App.css";
import Room from "./components/Room";
import Chat from "./components/Chat";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

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
          setRoomKey={setRoomkey}
          setOnChatScreen={setOnChatScreen}
          socket={socket}
        />
      ) : (
        <Chat />
      )}
    </div>
  );
}

export default App;
