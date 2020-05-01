const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { name } = req.body;
    
        await connection('user').insert({name});
    
        res.json({send:'sucessfull'})
    },

    async update_address(req, res){
        const id = req.headers.authorization;
        const verify = await connection('user').select('address').where({id})

        if(verify[0].address==null){
       const{ address, addressNumber, neighborhood, reference } = req.body;
    //    const name = await connection('user').select('name').where({id});
        
        await connection('user').update({
            address,
            addressNumber,
            neighborhood,
            reference,
        }).where({id});
    }
        else{
            return res.json(await connection('user').select('*').where({id}));
        }

    return res.json({send:'sucessfull'});
        
    }
}