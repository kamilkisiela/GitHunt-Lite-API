const repos = [
  {
    repository_name: 'apollostack/apollo-client',
    posted_by: 'stubailo',
  },
  {
    repository_name: 'apollostack/apollo-server',
    posted_by: 'helfer',
  },
  {
    repository_name: 'meteor/meteor',
    posted_by: 'tmeasday',
  },
  {
    repository_name: 'twbs/bootstrap',
    posted_by: 'Slava',
  },
];

export function seed(knex, Promise) {
  return Promise.all([
    knex('entries').del(),
    knex('comments').del(),
  ])

  // Insert some entries for the repositories
  .then(() => {
    return Promise.all(repos.map(({ repository_name, posted_by }, i) => {
      return knex('entries').insert({
        created_at: Date.now() - i * 10000,
        repository_name,
        posted_by,
      });
    }));
  });
}