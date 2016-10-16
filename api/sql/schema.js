import { property } from 'lodash';

// how property function works:
//    var objects = [
//      { 'a': { 'b': 2 } },
//      { 'a': { 'b': 1 } }
//    ];
//     
//    _.map(objects, _.property('a.b'));
//    // => [2, 1]

export const schema = [`

  type Entry {
    createdAt: Float! # Actually a date
    postedBy: String!
    id: Int!
    repository: Repository!
  }

`];

export const resolvers = {
  Entry: {
    // id: property('id') - GraphQL looks for properties with the same name 
    postedBy: property('posted_by'), // because "postedBy" != "posted_by" 
    createdAt: property('created_at'), // the same
    repository(root, _, context) {
      return context.Repositories.getByFullName(root.repository_name);
    },
  }
};
