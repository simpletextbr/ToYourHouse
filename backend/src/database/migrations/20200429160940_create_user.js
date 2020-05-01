
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.string('address');
      table.integer('addressNumber');
      table.string('neighborhood');
      table.string('reference');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
