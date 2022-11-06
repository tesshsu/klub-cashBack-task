/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('id')
        table.string('iban').notNullable()
        table.integer('balance').notNullable()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id')
    }).createTable('users', table => {
        table.increments('id')
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('email').notNullable().unique()
        table.text('password').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('accounts').dropTableIfExists('users')
};
