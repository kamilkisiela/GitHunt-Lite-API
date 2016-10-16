import { property, constant } from 'lodash';

// how property function works:
//    var objects = [
//      { 'a': { 'b': 2 } },
//      { 'a': { 'b': 1 } }
//    ];
//     
//    _.map(objects, _.property('a.b'));
//    // => [2, 1]
//
// how constant function works:
//    it creates a function that returns a value

export const schema = [`

  type Comment {
    id: Int!
    createdAt: Float! # Actually a date
    postedBy: String!
    content: String!
    repoName: String!
  }

  type Entry {
    createdAt: Float! # Actually a date
    postedBy: String!
    id: Int!
    repository: Repository!
    comments: [Comment]
    commentsCount: Int!
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
    comments(root, _, context) {
      return context.Comments.getCommentsByRepoName(root.repository_name);
    },
    commentsCount(root, _, context) {
      return context.Comments.getCommentsCount(root.repository_name) || constant(0);
    },
  },
  Comment: {
    createdAt: property('created_at'),
    postedBy: property('posted_by'),
  }
};
