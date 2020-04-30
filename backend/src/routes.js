const  express = require('express');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/singin', async(req, res) => {
    const { name, phone, address, city, uf} = req.body;
    let { password } = req.body;
    // hash simples de seguranca 
    let hash = 5;
    hash = 59 * password + hash;
    password=hash

    await connection('enterprise').insert({
        name,
        phone,
        address,
        city,
        uf,
        password
    });

    return res.json({send:'sucessfull'});
})








module.exports = routes

