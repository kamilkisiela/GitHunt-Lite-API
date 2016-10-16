import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`

  type User {
    login: String!
  }

  type Query {
    currentUser: User
  }

  schema {
    query: Query
  }

`];

const rootResolvers = {
  Query: {
    currentUser() {
      return {
        login: 'foo'
      };
    }
  }
};

const schema = rootSchema;
const resolvers = rootResolvers;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;