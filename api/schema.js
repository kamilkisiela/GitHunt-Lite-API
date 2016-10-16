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
