const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  // welcome incoming with emit method from frontend here:
  socket.on("roomkey", (data) => {
    socket.join(data);
  });

  socket.on("message", (messageData) => {
    socket.to(messageData.roomkey).emit("newMessage", messageData);
  });
});

const PORT = 7000;

server.listen(PORT, () => {
  console.log("Server listening port " + PORT + "... :)");
});
