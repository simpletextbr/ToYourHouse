import socketio from "socket.io-client";

import Url from "../utils/Url";

const socket = socketio(Url, {
  autoConnect: false,
});

function newerEnterprises(subiscribefunction) {
  socket.on("new-enterprise", subiscribefunction);
}

function connect() {
  socket.connect();

  socket.on("message", (text) => {
    console.log(text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, newerEnterprises };
