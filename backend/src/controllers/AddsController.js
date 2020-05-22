const connection = require('../database/connection');

module.exports = {
    async Index_Adds(req, res) {
        const enterprise_id = req.headers.authorization;
        const list = await connection('adds')
        .where('enterprise_id', enterprise_id)
        .select('*');

        if(!list[0]){
            return res.json(null)
         }
 
        return res.json(list);
        },
    async Create_Adds(req, res) {
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{
            const { name, price } = req.body;

            await connection('adds').insert({
                name,
                price,
                enterprise_id
            })
        }
        return res.json({send:'sucessfull'});
    },
    async delete_Adds(req, res){
        const { id } = req.params;
        const enterprise_id = req.headers.authorization;

        const verifyId = await connection('adds')
        .where('id', id)
        .select('enterprise_id')
        .first();


        if(verifyId.enterprise_id != enterprise_id){
            return res.status(401).json({error:'Not Authorized'});
        }else{

        await connection('adds').where('id', id).delete();

        return res.status(204).send();
        }
    }
}
