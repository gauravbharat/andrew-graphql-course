// import { extractFragmentReplacements } from 'prisma-binding';
// import Query from './Query.js';
// import Mutation from './Mutation.js';
// import Subscription from './Subscription.js';
// import User from './User.resolver.js';
// import Post from './Post.resolver.js';
// import Comment from './Comment.resolver.js';

const { extractFragmentReplacements } = require('prisma-binding');
const Query = require('./Query.js');
const Mutation = require('./Mutation.js');
const Subscription = require('./Subscription.js');
const User = require('./User.resolver.js');
const Post = require('./Post.resolver.js');
const Comment = require('./Comment.resolver.js');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  // Resolvers for type object or array columns/fields
  User,
  Post,
  Comment,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

module.exports = {
  resolvers,
  fragmentReplacements,
};

// export { resolvers, fragmentReplacements };
