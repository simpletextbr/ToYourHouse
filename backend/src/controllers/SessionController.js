const connection = require('../database/connection');

module.exports ={
    async create(req, res){
        const { name } = req.body;
        let { password }= req.body;

        let hash = 5;
        hash = 59 * password + hash;
        password=hash


        const login = await connection('enterprise')
        .where('name' && 'password', name && password)
        .select('name')
        .first();

        console.log(login)


        if(!login){
            return res.status(400).json({error: 'Wrong password or name'});
        }

        return res.json(login)


    }
}