
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table){
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.integer('addressNumber').notNullable();
      table.string('neighborhood').notNullable();
      table.string('reference').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
