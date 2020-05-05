const connection = require('../database/connection');

module.exports ={
    async Index_Payments(req, res){
        const list = await connection('payments').select('*');
        
        return res.json(list)
        
    },
    async create_Payments(req, res){
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{
            const { title } = req.body;

            await connection('payments').insert({
                title,
                enterprise_id
            })
        }
        return res.json({send:'sucessfull'});
    }
}