const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketio(server);
const publicDirPath = path.join(__dirname, "../public");
const Filter = require("bad-words");
app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("message", "Welcome !!");
  socket.broadcast.emit("message", "A new user has joined");
  socket.on("msgReceived", (newMsg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(newMsg)) {
      return callback("Profanity not allowed");
    }
    io.emit("message", newMsg); //emits to every single connected client
    callback(); //ack->can provide arg
  });
  socket.on("sendLocation", (pos, callback) => {
    io.emit(
      "message",
      `https://maps.google.com/?q=${pos.latitude},${pos.longitude}`
    ); //emits to every single connected client
    callback()
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log("Server is up on port" + port);
});
