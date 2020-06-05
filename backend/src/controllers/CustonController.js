const connection = require('../database/connection');

module.exports = {
    async index_Custon(req, res){
        const enterprise_id = req.headers.authorization;

        const list = await connection('custom')
        .where('enterprise_id', enterprise_id)
        .select('backgound_app', 'button_app', 'enterprise_id');

        return res.json(list);

    },

    async create_Custon(req, res){
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({error:'Id Unauthorized'});
        }else{
            const {backgound_app, button_app} = req.body;

            await connection('custom').update({
                backgound_app,
                button_app,
                enterprise_id
            }).where({enterprise_id})
        }
        return res.json({send:"sucessfull"});
    }
}