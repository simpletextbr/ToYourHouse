const express = require("express");
const multer = require("multer");
const uploadConfigLogo = require("./config/logoUpload");
const uploadConfigCardapio = require("./config/cardapioUpload");

const EnterpriseController = require("./controllers/EnterpriseController");
const SessionController = require("./controllers/SessionController");
const MobileController = require("./controllers/MobileController");
const UserController = require("./controllers/UserController");
const ProductsController = require("./controllers/ProductsController");
const CategoryController = require("./controllers/CategoryController");
const AddsController = require("./controllers/AddsController");
const PaymentsController = require("./controllers/PaymentsController");
const CustonController = require("./controllers/CustonController");
const UploadController = require("./controllers/UploadController");

const routes = express.Router();
const uploadlogo = multer(uploadConfigLogo);
const uploadcardapio = multer(uploadConfigCardapio);

//Cadastro do usuario final(realizar pedido)
routes.post("/user/new", UserController.create);

//Listagem de usuarios finais
routes.get("/user", UserController.Index);

//Logout do usuario final
routes.delete("/user/:id", UserController.delete);

//Atualizacao do endereco do usuario final
routes.put("/user/order/address", UserController.update_address);

//listagem das empresas cadastradas no mobile
routes.get("/mobile/list", MobileController.index);

//Login da Empresa
routes.post("/session", SessionController.create);

//listagem de empresas
routes.get("/enterprise/list", EnterpriseController.index);

//Cadastro do usuario empresa
routes.post("/register", EnterpriseController.create);

//Mudar senha
routes.put("/changepass", EnterpriseController.update_pass);

//Upload de logo e do cardapio
routes.put(
  "/config/upload/logo",
  uploadlogo.single("logo"),
  UploadController.logo_upload
);

routes.put(
  "/config/upload/cardapio",
  uploadcardapio.single("cardapio"),
  UploadController.cardapio_upload
);

//alterando customizacao do fundo e dos botoes
routes.put("/config/custom", CustonController.update_Custon);

//alterando status de funcionamento da empresa
routes.put("/config/status", CustonController.update_status);

//Listagem de Cores
routes.get("/config/custom", CustonController.index_Custon);

//Cadastro de categoria, Listar, Deletar
routes.post("/category", CategoryController.create_Category);
routes.get("/category", CategoryController.Index_Category);
routes.delete("/category/:id", CategoryController.delete_Category);

//Cadastro de Produtos, Listar, Deletar
routes.post("/products/:cat_id", ProductsController.create_Products);
routes.get("/products", ProductsController.Index_Products);
routes.delete("/products/:id", ProductsController.delete_Products);

//Cadastro de Acréscimos, Listar, Deletar
routes.post("/adds", AddsController.Create_Adds);
routes.get("/adds", AddsController.Index_Adds);
routes.delete("/adds/:id", AddsController.delete_Adds);

//Cadastro de Pagamentos, Listar, Deletar
routes.post("/config/payments", PaymentsController.create_Payments);
routes.get("/config/payments", PaymentsController.Index_Payments);
routes.delete("/config/payments/:id", PaymentsController.delete_Payments);

module.exports = routes;
