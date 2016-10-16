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
  }
};

const schema = [...rootSchema, ...sqlSchema, ...ghSchema]; // one-level array
const resolvers = merge(rootResolvers, sqlResolvers, ghResolvers); // merge resolvers

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
