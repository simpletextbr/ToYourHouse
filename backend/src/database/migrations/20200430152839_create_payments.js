
exports.up = function(knex) {
    return knex.schema.createTable('payments', function(table){
        table.increments('id');
        table.string('title').notNullable();

  
        table.integer('enterprise_id').notNullable();
        table.foreign('enterprise_id').references('id').inTable('enterprise');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('payments');
};
