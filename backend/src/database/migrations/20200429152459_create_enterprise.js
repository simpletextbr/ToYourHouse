
exports.up = function(knex) {
  return knex.schema.createTable('enterprise', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone').min(11).max(13).notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('password').notNullable();
      knex.schema.hasColumn('enterprise', 'password');
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('enterprise');

};
