
exports.up = function(knex) {
  return knex.schema.createTable('adds', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.decimal('price').notNullable();

      table.integer('enterprise_id').notNullable();
      table.foreign('enterprise_id').references('id').inTable('enterprise');

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('adds');
};
