const connection = require('../database/connection');

module.exports ={
    async create(req, res){
        const { name } = req.body;
        let { password }= req.body;

        let hash = 823;
        hash = 223 * (password * hash);
        password=hash


        const login = await connection('enterprise')
        .where('password', password)
        .select('name', 'id')
        .first();


        if(!login || login.name != name){
            return res.status(400).json({error: 'Wrong password or name'});
            }


            return res.status(202).json(login)
        }
    }
