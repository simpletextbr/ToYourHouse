exports.up = function (knex) {
  return knex.schema.createTable("adds", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.decimal("price").notNullable();

    table.integer("enterprise_id").unsigned();

    table.foreign("enterprise_id").references("enterprise.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("adds");
};
