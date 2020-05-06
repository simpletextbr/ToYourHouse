const connection = require('../database/connection');

module.exports = {
    async Index_Category(req, res) {
        const enterprise_id = req.headers.authorization;
        const list = await connection('categoryProducts')
        .where('enterprise_id', enterprise_id)
        .select('*');

        return res.json(list);
    },

    async create_Category(req, res) {
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{
            const { name } = req.body;

            await connection('categoryProducts').insert({
                name,
                enterprise_id
            });
        }
        return res.json({send:'sucessfull'});
    },
    async delete_Category(req, res){
        const { id } = req.params;
        const enterprise_id = req.headers.authorization;

        const verifyId = await connection('categoryProducts')
        .where('id', id)
        .select('enterprise_id')
        .first();


        if(verifyId.enterprise_id != enterprise_id){
            return res.status(401).json({error:'Not Authorized'});
        }else{

        await connection('categoryProducts').where('id', id).delete();

        return res.status(204).send();
        }
    }

}