const  express = require('express');



const EnterpriseController = require('./controllers/EnterpriseController');
const MobileController = require('./controllers/MobileController');
const UserController = require('./controllers/UserController');
const ProductsController = require('./controllers/ProductsController');
const CategoryController = require('./controllers/CategoryController');
const AddsController = require('./controllers/AddsController');
const PaymentsController = require('./controllers/PaymentsController');
const CustonController = require('./controllers/CustonController');

const routes = express.Router();

//MOBILE
//Cadastro do usuario final(realizar pedido)
routes.post('/mobile', UserController.create);
//listagem das empresas cadastradas no mobile
routes.get('/mobile/list',  MobileController.index);
//Atualizacao do endereco do usuario final
routes.put('/mobile/order/address', UserController.update_address);


//WEB
//Cadastro do usuario empresa
routes.post('/', EnterpriseController.create);
//Cadastro de categoria, Listar, Deletar
routes.post('/category', CategoryController.create_Category);
routes.get('/category', CategoryController.Index_Category);
//Cadastro de Produtos, Listar, Deletar
routes.post('/category/products', ProductsController.create_Products);
routes.get('/category/products', ProductsController.Index_Products);
routes.delete('/category/products/:id', ProductsController.delete_Products);
//Cadastro de produtos, Listar, Deletar 
routes.post('/adds', AddsController.Create_Adds);
routes.get('/adds', AddsController.Index_Adds);
//Cadastro de Pagamentos, Listar, Deletar 
routes.post('/config/payments', PaymentsController.create_Payments);
routes.get('/config/payments', PaymentsController.Index_Payments);
//alterando customizacao do fundo e dos botoes 
routes.put('/config/custom', CustonController.create_Custon);

module.exports = routes

