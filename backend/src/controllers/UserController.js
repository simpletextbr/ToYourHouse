const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { name } = req.body;

        const response = await connection('user').where('name',name).first();
        

        if(!name.trim()){
           return res.json({send:'Você precisa digitar o seu nome para entar'});
        }else if(response){
           return res.json({send: 'Opa! Parece que esse nome ja esta em uso!, por favor tente outro'});
        }else{   
            await connection('user').insert({name}); 
        }
        return res.json(name)
    },

    async update_address(req, res){
        const id = req.headers.authorization;
        const verifyId = await connection('user').select('id').where({id});

        if(!verifyId[0]){
            return res.status(401).json({ error:'Id Unauthorized'});
        }else{
            const verify_Address = await connection('user').select('address').where({id})

        if(verify_Address[0].address==null){
            const{ address, addressNumber, neighborhood, reference } = req.body;

        
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
}