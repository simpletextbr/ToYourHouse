const connection = require("../database/connection");
const { sendMessage } = require("../websocket");

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
      const enterprise = await connection("enterprise").insert({
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

      const sendSocketMessageTo = "any";

      sendMessage(sendSocketMessageTo, "new-enterprise", enterprise);
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

  async update_pass(req, res) {
    const id = req.headers.authorization;
    const verifyId = await connection("enterprise")
      .select("id", "password")
      .where({ id })
      .first();

    if (!verifyId) {
      return res.status(400).json({ error: "Id Unauthorized" });
    } else {
      let { olderpass, newpass, repnewpass } = req.body;

      let hash = 823;
      hash = 223 * (olderpass * hash);
      olderpass = hash;

      if (olderpass != verifyId.password) {
        return res.json({ send: "Older Password Incompatible" });
      } else if (newpass != repnewpass)
        return res.json({ send: "Newer Password Incompatible" });
      else {
        let hash = 823;
        hash = 223 * (newpass * hash);
        newpass = hash;

        let password = newpass;

        await connection("enterprise")
          .update({
            password,
          })
          .where({ id });

        return res.status(200).json({ send: "sucessfull" });
      }
    }
  },
};
