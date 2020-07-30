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
    const name = req.body;

    const response = await connection("user").insert(name);

    return res.json(response);
  },

  async update_address(req, res) {
    const id = req.headers.authorization;
    const verifyId = await connection("user").select("id").where({ id });

    if (!verifyId[0]) {
      return res.status(401).json({ error: "Id Unauthorized" });
    } else {
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

    const verify = await connection("user")
      .where("id", id)
      .select("id", "name")
      .first();

    console.log(verify);
    console.log(verify.id);
    console.log(id);

    if (!verify || verify.id != id) {
      return res.status(401).json({ send: "Unautorized" });
    }

    await connection("user").where("id", id).delete();

    return res.status(204).send();
  },
};
