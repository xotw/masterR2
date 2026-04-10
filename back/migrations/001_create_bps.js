exports.up = function (knex) {
  return knex.schema.createTable('bps', (t) => {
    t.increments('id').primary();
    t.string('name', 100).notNullable().unique();
    t.string('role', 50).notNullable();
    t.string('color', 10).notNullable();
    t.string('text_color', 10).notNullable().defaultTo('#000');
    t.text('photo_url');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bps');
};
