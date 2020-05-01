const  express = require('express');



const EnterpriseController = require('./controllers/EnterpriseController');
const MobileController = require('./controllers/MobileController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

//MOBILE
//listagem das empresas cadastradas no mobile
routes.get('/mobile/list',  MobileController.index);
//Cadastro do usuario final(realizar pedido)
routes.post('/mobile', UserController.create);
//Cadastro do endereco do usuario final
routes.put('/mobile/order/address', UserController.update_address);


//WEB
//Cadastro do usuario empresa
routes.post('/', EnterpriseController.create);


module.exports = routes

