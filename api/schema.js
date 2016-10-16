import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';
import { schema as ghSchema, resolvers as ghResolvers } from './github/schema';

const rootSchema = [`

  type User {
    login: String!
  }

  type Query {
    currentUser: User
    feed: [Entry]
    entry (repoFullName: String!): Entry
  }

  type Mutation {
    submitRepository (repoFullName: String!): Entry
  }

  schema {
    query: Query
  }

`];

const rootResolvers = {
  Query: {
    currentUser(root, args, context) {
      return context.auth.getUser();
    },
    feed(root, args, context) {
      return context.Entries.getForFeed();
    },
    entry(root, args, context) {
      return context.Entries.getByRepoFullName(args.repoFullName);
    },
  },
  Mutation: {
    submitRepository(root, args, context) {
      if (!context.auth.getUser()) {
        throw new Error('Must be logged in to submit a repository.');
      }

      return Promise.resolve()
        // check if repository exists
        .then(() => {
          return context.Repositories.getByFullName(args.repoFullName)
            .catch(() => {
              throw new Error(`Couldn't find repository named "${args.repoFullName}"`);
            })
        })
        // submit a new repository
        .then(() => {
          return context.Entries.submitRepository(args.repoFullName, context.auth.getUser().login)
        })
    },
  },
};

const schema = [...rootSchema, ...sqlSchema, ...ghSchema]; // one-level array
const resolvers = merge(rootResolvers, sqlResolvers, ghResolvers); // merge resolvers

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
