import knex from './connector';

export class Comments {
  getCommentById(id) {
    const query = knex('comments')
      .where({ id });
    return query.then(([row]) => row);
  }

  getCommentsByRepoName(name) {
    const query = knex('comments')
      .where({ repository_name: name })
      .orderBy('created_at', 'desc');
    return query.then(rows => (rows || []));
  }

  getCommentsCount(name) {
    const query = knex('comments')
      .where({ repository_name: name })
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitComment(repoFullName, username, content) {
    return knex.transaction(trx => trx('comments')
      .insert({
        content,
        created_at: Date.now(),
        repository_name: repoFullName,
        posted_by: username,
      }));
  }
}
export class Entries {
  getForFeed() {
    const query = knex('entries')

    return query;
  }

  getByRepoFullName(name) {
    // No need to batch
    const query = knex('entries')
      .where({
        repository_name: name,
      })
      .first();

    return query;
  }

  submitRepository(repoFullName, username) {
    const rateLimitMs = 60 * 60 * 1000;
    const rateLimitThresh = 3;

    // Rate limiting logic
    return knex.transaction(trx => trx('entries')
      .count()
      .where('posted_by', '=', username)
      .where('created_at', '>', Date.now() - rateLimitMs)
      .then((obj) => {
        // If the user has already submitted too many times, we don't
        // post the repo.
        const postCount = obj[0]['count(*)'];
        if (postCount > rateLimitThresh) {
          throw new Error('Too many repos submitted in the last hour!');
        } else {
          return trx('entries')
            .insert({
              created_at: Date.now(),
              updated_at: Date.now(),
              repository_name: repoFullName,
              posted_by: username,
            });
        }
      }));
  }
}
