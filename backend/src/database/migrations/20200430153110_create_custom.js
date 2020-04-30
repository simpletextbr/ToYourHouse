
exports.up = function(knex) {
    return knex.schema.createTable('custom', function(table){
        table.increments('id');
        table.string('backgound_app').notNullable();
        table.string('button_app').notNullable();

  
        table.integer('enterprise_id').notNullable();
        table.foreign('enterprise_id').references('id').inTable('enterprise');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('custom');
};
