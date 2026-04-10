exports.up = function (knex) {
  return knex.schema.createTable('lever_analyses', (t) => {
    t.increments('id').primary();
    t.integer('presentation_id').notNullable()
      .references('id').inTable('presentations').onDelete('CASCADE');
    t.string('lever', 20).notNullable();
    t.decimal('note_globale', 3, 1).notNullable().defaultTo(7.0);
    t.text('lecture_business').notNullable().defaultTo('');
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.unique(['presentation_id', 'lever']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('lever_analyses');
};
