exports.up = function (knex) {
  return knex.schema.createTable('sub_scores', (t) => {
    t.increments('id').primary();
    t.integer('analysis_id').notNullable()
      .references('id').inTable('lever_analyses').onDelete('CASCADE');
    t.string('nom', 50).notNullable();
    t.decimal('note', 3, 1).notNullable().defaultTo(7.0);
    t.text('description').notNullable().defaultTo('');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sub_scores');
};
