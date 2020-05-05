const connection = require('../database/connection');

module.exports = {

async create(req, res) {
    const backgound_app = '#FDF5F5'
    const button_app = '#FF0000'
    const { name, phone, address, city, uf} = req.body;
    let { password } = req.body;

    // hash simples de seguranca 
    let hash = 5;
    hash = 59 * password + hash;
    password=hash

    await connection('enterprise').insert({
        name,
        phone,
        address,
        city,
        uf,
        password
    });

    let enterprise_id = await connection('enterprise').select('id').where({password})
    enterprise_id=enterprise_id[0].id;

    await connection('custom').insert({
        backgound_app,
        button_app,
        enterprise_id
    })

    return res.json({send:'sucessfull'});
    }
};