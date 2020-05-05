const connection = require('../database/connection');

module.exports = {
async index(req, res){
    const list = await connection('enterprise').select('*');

    res.json(list);
    }
}