/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('merchants', table => {
        table.increments('id')
        table.string('merchantName', 30).notNullable()
        table.binary('logo_url', 250).nullable()
        table.text('description').nullable()
        table.decimal('percentageCashBack', 8, 2).nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('merchants');
};
