import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';

const rootSchema = [`

  type User {
    login: String!
  }

  type Query {
    currentUser: User
    feed: [Entry]
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
  }
};

const schema = [...rootSchema, ...sqlSchema]; // one-level array
const resolvers = merge(rootResolvers, sqlResolvers); // merge resolvers

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;