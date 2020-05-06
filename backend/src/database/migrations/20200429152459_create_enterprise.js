
exports.up = function(knex) {
  return knex.schema.createTable('enterprise', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('phone', 11).notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('password').notNullable();
      table.string('logo');
      table.string('cardapio');
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('enterprise');

};
