// Since Knex always runs this file first, all of our seeds and migrations are babelified.
require('babel-register');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
  },
};