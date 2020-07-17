const connection = require("../database/connection");

module.exports = {
  async Index_Products(req, res) {
    const enterprise_id = req.headers.authorization;
    const list = await connection("products")
      .where("enterprise_id", enterprise_id)
      .select("*");

    if (!list[0]) {
      return res.json(null);
    }

    return res.json(list);
  },
  async create_Products(req, res) {
    const enterprise_id = req.headers.authorization;
    const cat_id = req.headers.cat_authorization;
    const verifyId = await connection("enterprise")
      .select("id")
      .where({ id: enterprise_id });
    const verityCat = await connection("categoryProducts")
      .select("id")
      .where({ id: cat_id });

    if (!verifyId[0] || !verityCat[0]) {
      return res.status(401).json({ error: "Not Authorized" });
    } else {
      const { name, Ing, price, adds } = req.body;

      await connection("products").insert({
        name,
        Ing,
        price,
        adds,
        enterprise_id,
        cat_id,
      });
    }
    return res.json({ send: "sucessfull" });
  },
  async delete_Products(req, res) {
    const { id } = req.params;
    const enterprise_id = req.headers.authorization;

    const verify = await connection("products")
      .where("id", id)
      .select("enterprise_id")
      .first();

    if (verify.enterprise_id != enterprise_id) {
      return res.status(401).json({ error: "Not Authorized" });
    } else {
      await connection("products").where("id", id).delete();

      return res.status(204).send();
    }
  },
};
