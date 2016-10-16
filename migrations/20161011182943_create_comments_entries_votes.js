export function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', (table) => {
      table.increments();
      table.timestamps();
      table.string('posted_by');
      table.text('content');
      table.string('repository_name');
    }),

    knex.schema.createTable('entries', (table) => {
      table.increments();
      table.timestamps();
      table.string('repository_name').unique();
      table.string('posted_by');
    })
  ]);
}

export function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('entries')
  ]);
}