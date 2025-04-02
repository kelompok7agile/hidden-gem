/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("users", (table) => {
        table.string("password", 100).alter(); // Perbesar panjang kolom password
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("users", (table) => {
        table.string("password", 50).alter(); // Kembalikan ke panjang sebelumnya
    });
};
