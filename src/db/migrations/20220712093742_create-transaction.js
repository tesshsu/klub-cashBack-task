/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id')
        table.enu('type', ['transfer', 'payment', 'refund']).notNullable()
        table.integer('total').notNullable()
        table.text('description').nullable()
        table.text('extra').nullable()
        table.integer('account_id').notNullable()
            .references('id')
            .inTable('accounts')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transactions');
};
