/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user_groups", (table) => {
      table.string("user_group_id", 2).primary(); // Primary key
      table.string("nama", 50).notNullable(); // Nama
    })
    .then(() => {
      return knex.schema.createTable("users", (table) => {
        table.bigIncrements("user_id").primary(); // Primary key
        table
          .string("user_group_id", 2)
          .notNullable()
          .references("user_group_id")
          .inTable("user_groups")
          .onDelete("CASCADE")
          .onUpdate("CASCADE"); // Foreign key ke user_groups
        table.string("nama", 100).notNullable(); // Nama
        table.string("email", 100).notNullable().unique(); // Email
        table.string("nomor_telepon", 20).notNullable(); // Nomor Telepon
        table.string("password", 50).notNullable(); // Password
        table.timestamp("dibuat_pada").defaultTo(knex.fn.now()); // Timestamp dibuat
        table.bigInteger("dibuat_oleh_user_id").unsigned(); // ID user yang membuat
        table.timestamp("diubah_pada").nullable(); // Timestamp diubah
        table.bigInteger("diubah_oleh_user_id").unsigned().nullable(); // ID user yang mengubah
        table.timestamp("dihapus_pada").nullable(); // Timestamp dihapus
        table.bigInteger("dihapus_oleh_user_id").unsigned().nullable(); // ID user yang menghapus
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("users") // Hapus tabel users terlebih dahulu
    .then(() => {
      return knex.schema.dropTable("user_groups"); // Hapus tabel user_groups
    });
};
