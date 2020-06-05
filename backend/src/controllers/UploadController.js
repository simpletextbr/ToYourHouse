const connection = require('../database/connection');

module.exports ={
    async logo_upload(req, res){
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{

            const { filename } = req.file;
            const logo = filename;

            const authorization = await connection('enterprise')
            .where('id', enterprise_id)
            .first();

            await connection('enterprise').update({
                logo,
            }).where({id:authorization.id})

            return res.json({send: 'sucessfull'});
        }
    },
    async cardapio_upload(req, res){
        const enterprise_id = req.headers.authorization;
        const verifyId = await connection('enterprise').select('id').where({id:enterprise_id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{

            const { filename } = req.file;
            const cardapio = filename;

            const authorization = await connection('enterprise')
            .where('id', enterprise_id)
            .first();

            await connection('enterprise').update({
                cardapio,
            }).where({id:authorization.id})

            return res.json({send: 'sucessfull'});
        }
    },
}