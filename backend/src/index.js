const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const app = express();

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

app.listen(3333);
