const connection = require('../database/connection');

module.exports = {
    async Index_Category(req, res) {
        const list = await connection('categoryProducts').select('*');

        return res.json({list});
    },

    async create_Category(req, res) {
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({send:'Id Unauthorized'});
        }else{
            const { name } = req.body;

            await connection('categoryProducts').insert({
                name,
                enterprise_id
            });
        }
        return res.json({send:'sucessfull'});
    },

}