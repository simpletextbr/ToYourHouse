exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.string("Ing").notNullable();
    table.decimal("price").notNullable();
    table.string("adds").notNullable();

    table.integer("enterprise_id").unsigned();
    table.foreign("enterprise_id").references("enterprise.id");

    table.integer("cat_id").unsigned();
    table.foreign("cat_id").references("categoryProducts.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
