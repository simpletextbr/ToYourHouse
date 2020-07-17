const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const id = req.headers.authorization;

    const list = await connection("enterprise")
      .where("id", id)
      .select(
        "id",
        "name",
        "phone",
        "address",
        "city",
        "uf",
        "logo",
        "cardapio"
      );

    return res.json(list);
  },

  async create(req, res) {
    const backgound_app = "#FDF5F5";
    const button_app = "#FF0000";
    const title = "Dinheiro";
    const { name, phone, address, city, uf } = req.body;
    let { password } = req.body;

    // hash simples de seguranca
    let hash = 823;
    hash = 223 * (password * hash);
    password = hash;

    const verifyph = await connection("enterprise")
      .where("phone", phone)
      .first();

    const verifypass = await connection("enterprise")
      .where("password", password)
      .first();

    const verifyname = await connection("enterprise")
      .where("name", name)
      .first();

    if (!verifyph && !verifypass && !verifyname) {
      await connection("enterprise").insert({
        name,
        phone,
        address,
        city,
        uf,
        password,
      });

      let enterprise_id = await connection("enterprise")
        .select("id")
        .where({ password });
      enterprise_id = enterprise_id[0].id;

      await connection("custom").insert({
        backgound_app,
        button_app,
        enterprise_id,
      });

      await connection("payments").insert({
        title,
        enterprise_id,
      });
    } else if (verifypass) {
      return res.json({
        error:
          "Nós já vimos muitas senhas como essa por favor, Tente algo mais seguro!",
      });
    } else if (verifyname) {
      return res.json({
        error:
          "Nós já vimos esse nome por aqui por favor, Tente a aba de login!",
      });
    } else
      return res.json({
        error: "Usuario ja Cadastrado, Tente na aba de Login",
      });
    return res.json({ send: "sucessfull" });
  },
};
