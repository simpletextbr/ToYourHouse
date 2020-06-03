const connection = require('../database/connection');

module.exports = {
async index(req, res){
    const { page = 1 } = req.query;
    const [count] = await connection('enterprise')
    .count();

    const list = await connection('enterprise')
    .limit(6)
    .offset((page - 1 ) * 6)
    .select('id','name','phone','address','city','uf', 'logo', 'cardapio');


    res.header('Amazing-Enterprises', count['count(*)']);
    res.json(list);
    }
}