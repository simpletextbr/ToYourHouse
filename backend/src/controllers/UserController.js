const connection = require("../database/connection");

module.exports = {
  async Index(req, res) {
    const id = req.headers.authorization;

    const list = await connection("user").where("id", id).select("*");

    if (!list[0]) {
      return res.json(null);
    }

    return res.json(list);
  },

  async create(req, res) {
    const { name } = req.body;

    const response = await connection("user").where("name", name).first();

    if (!name.trim()) {
      return res.json({ send: "Você precisa digitar o seu nome para entar" });
    } else if (response) {
      return res.json({
        send:
          "Opa! Parece que esse nome ja esta em uso!, por favor tente outro",
      });
    } else {
      const id = await connection("user").insert({ name });

      return res.json({ id, name });
    }
  },

  async update_address(req, res) {
    const id = req.headers.authorization;
    const verifyId = await connection("user").select("id").where({ id });

    if (!verifyId[0]) {
      return res.status(401).json({ error: "Id Unauthorized" });
    } else {
      const verify_Address = await connection("user")
        .select("address")
        .where({ id });

      const { address, addressNumber, neighborhood, reference } = req.body;

      await connection("user")
        .update({
          address,
          addressNumber,
          neighborhood,
          reference,
        })
        .where({ id });

      return res.json({ send: "sucessfull" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const name = req.headers.authorization;

    const verify = await connection("user")
      .where("name", name)
      .select("id", "name")
      .first();

    if (!verify || verify.id != id) {
      return res.json({ send: "Unautorized" });
    }

    await connection("user").where("id", id).delete();

    return res.status(204).send();
  },
};
