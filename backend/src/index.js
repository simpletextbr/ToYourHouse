const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");

const routes = require("./routes");
const { setWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(
  "/file/logo",
  express.static(path.resolve(__dirname, "..", "uploads", "logo"))
);
app.use(
  "/file/cardapio",
  express.static(path.resolve(__dirname, "..", "uploads", "cardapio"))
);
app.use(routes);

server.listen(3333);
