const  express = require('express');



const EnterpriseController = require('./controllers/EnterpriseController');
const MobileController = require('./controllers/MobileController');
const UserController = require('./controllers/UserController');
const ProductsController = require('./controllers/ProductsController');
const CategoryController = require('./controllers/CategoryController');

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


module.exports = routes

