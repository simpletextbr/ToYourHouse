const socketio = require("socket.io");

let io;
const connections = [];

exports.setWebsocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    connections.push({
      id: socket.id,
    });
  });
};

exports.sendMessage = (to, message, data) => {
  to.array.forEach((connection) => {
    io.to(connections.id).emit(message, data);
  });
};
