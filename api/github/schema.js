export const schema = [`
  type Repository {
    name: String!
    owner: String!
    description: String
    url: String!
    stars: Int!
    issues: Int
  }
`];

export const resolvers = {};
