/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cashbacks', table => {
        table.increments('id')
        table.enu('status', ['waited', 'finish', 'cancel']).notNullable()
        table.integer('total').notNullable()
        table.integer('transaction_id').notNullable()
            .references('id')
            .inTable('transactions')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cashbacks');
};
