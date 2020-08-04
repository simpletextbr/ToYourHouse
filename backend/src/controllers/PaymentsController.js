const connection = require("../database/connection");

module.exports = {
  async Index_Payments(req, res) {
    const enterprise_id = req.headers.authorization;
    const list = await connection("payments")
      .where("enterprise_id", enterprise_id)
      .select("*");

    if (!list[0]) {
      return res.json(null);
    }

    return res.json(list);
  },

  async create_Payments(req, res) {
    const enterprise_id = req.headers.authorization;
    const verifyId = await connection("enterprise")
      .select("id")
      .where({ id: enterprise_id });

    if (!verifyId[0]) {
      return res.status(401).json({ error: "Id Unauthorized" });
    } else {
      const { title } = req.body;

      await connection("payments").insert({
        title,
        enterprise_id,
      });
    }
    return res.json({ send: "sucessfull" });
  },

  async delete_Payments(req, res) {
    const { id } = req.params;
    const enterprise_id = req.headers.authorization;

    const verifyId = await connection("payments")
      .where("id", id)
      .select("enterprise_id")
      .first();

    if (verifyId.enterprise_id != enterprise_id) {
      return res.status(401).json({ error: "Not Authorized" });
    } else {
      await connection("payments").where("id", id).delete();

      return res.status(204).send();
    }
  },
};
