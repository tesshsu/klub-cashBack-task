const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('merchants').del()

  await knex('merchants').insert([
    {merchantName: 'CARREFOUR', logo_url: 'https://sendeyo.com/show/d028f1abc4', description:'Transaction 1', percentageCashBack: 2.5  },
    {merchantName: 'AUCHANT', logo_url: 'https://sendeyo.com/show/d028f1abc4', description:'Transaction 2', percentageCashBack: 3  },
  ]);
};
