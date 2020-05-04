const connection = require('../database/connection');

module.exports = {
    async Index_Adds(req, res) {
        const list = await connection('adds').select('*');

        return res.json(list);
    },
    async Create_Adds(req, res) {
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({send:'Id Unauthorized'});
        }else{
            const { name, price } = req.body;

            await connection('adds').insert({
                name,
                price,
                enterprise_id
            })
        }
        return res.json({send:'sucessfull'});
    }
}
