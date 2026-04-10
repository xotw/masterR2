exports.up = function (knex) {
  return knex.schema.createTable('mcp_settings', (t) => {
    t.increments('id').primary();
    t.string('tool_id', 30).notNullable().unique();
    t.boolean('enabled').notNullable().defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mcp_settings');
};
