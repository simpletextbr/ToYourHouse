const connection = require('../database/connection');

module.exports ={
    async Index_Products(req, res){
        const list = await connection('products').select('*');

        return res.json({list});

    },
    async create_Products(req, res){
        const enterprise_id = req.headers.authorization;
        const cat_id = req.headers.cat_authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});
        const verityCat = await connection('categoryProducts').select('id').where({id:cat_id});

        if(!verifyId || !verityCat){
            return res.status(404).json({send:'Not Authorized'});
        }else{

            const{ name, Ing, price } = req.body;

            await connection('products').insert({
                name,
                Ing,
                price,
                enterprise_id,
                cat_id
            })

        }
        return res.json({send:'sucessfull'});
    }

}