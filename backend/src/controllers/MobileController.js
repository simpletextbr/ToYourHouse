const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const [count] = await connection("enterprise").count();

    const list = await connection("enterprise")
      .limit(10)
      .offset((page - 1) * 10)
      .select(
        "id",
        "name",
        "phone",
        "address",
        "city",
        "uf",
        "status",
        "logo",
        "cardapio"
      );

    res.header("X-Total-Count", count["count(*)"]);
    res.json(list);
  },
};
