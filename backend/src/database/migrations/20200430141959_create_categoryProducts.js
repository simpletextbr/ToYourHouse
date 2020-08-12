exports.up = function (knex) {
  return knex.schema.createTable("categoryProducts", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();

    table.integer("enterprise_id").unsigned();

    table.foreign("enterprise_id").references("enterprise.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categoryProducts");
};
