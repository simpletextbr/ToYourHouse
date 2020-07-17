exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.string("Ing").notNullable();
    table.decimal("price").notNullable();
    table.boolean("adds").notNullable();

    table.integer("enterprise_id").notNullable();
    table.foreign("enterprise_id").references("id").inTable("enterprise");

    table.integer("cat_id").notNullable();
    table.foreign("cat_id").references("id").inTable("categoryProducts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
