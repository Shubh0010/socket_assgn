const express = require(`express`)
const app = express()
const socketio = require('socket.io')

users = []
connections = []
const io = socketio(app.listen(4001, (err, data) => {
  console.log("server running")
}))

const admin = io.of("/admin")
app.get(`/`, (req, res) => {
<<<<<<< HEAD
  res.sendFile(__dirname + '/public/index.html')
})


io.on(`connection`, (socket) => {
  connections.push(socket)
=======
  res.sendFile(__dirname + "/public/index.html");
  console.log("heloooooooooooooo")
});

io.on(`connection`, socket => {
  console.log("new user connected")
  connections.push(socket);
>>>>>>> 5a018cabf479d83dfd1b9029de4045eaf0554c94

  //disconnect
  socket.on(`disconnect`, (data) => {
    users.splice(users.indexOf(socket.username), 1)
    updateUserNames()
    connections.splice(connections.indexOf(socket), 1)
  })

  //send message
  console.log("test2");

  socket.on(`send message`, (data) => {
    io.emit(`new message`, { msg: data, user: socket.username })
  })

  //new user

  socket.on(`new user`, (data, callback) => {
    callback(true)
    socket.username = data;
    users.push(socket.username);
    updateUserNames();
  })

  function updateUserNames() {
    io.emit(`get users`, users)
  }
<<<<<<< HEAD
})
=======
});
>>>>>>> 5a018cabf479d83dfd1b9029de4045eaf0554c94
