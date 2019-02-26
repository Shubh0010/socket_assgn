const express = require(`express`);
const app = express();
const socketio = require("socket.io");

users = [];
connections = [];
const io = socketio(
  app.listen(4001, (err, data) => {
    console.log("server running");
  })
);

const admin = io.of("/admin");
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on(`connection`, socket => {
  console.log("new user connected")
  connections.push(socket);

  //disconnect
  socket.on(`disconnect`, data => {
    users.splice(users.indexOf(socket.username), 1);
    updateUserNames();
    connections.splice(connections.indexOf(socket), 1);
  });

  //send message

  socket.on(`send message`, data => {
    io.emit(`new message`, {
      msg: data,
      user: socket.username
    });
  });

  //new user

  socket.on(`new user`, (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUserNames();
  });

  function updateUserNames() {
    io.emit(`get users`, users);
  }
});