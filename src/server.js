// import { GraphQLServer, PubSub } from 'graphql-yoga';
// import db from './db.js';
// import prisma from './prisma.js';
// import { resolvers, fragmentReplacements } from './resolvers/index.js';

const { GraphQLServer, PubSub } = require('graphql-yoga');
const db = require('./db');
const prisma = require('./prisma');
const { resolvers, fragmentReplacements } = require('./resolvers/index');

// Graphql-Subscriptions method: Publish, Subscribe
const pubsub = new PubSub();

/** Define Type Definitions and Resolvers before starting the server
 * GraphQL Scalar Types (discreet values/one-value only): String, Boolean, Int, Float, ID
 * Non-scalar types (collection of discreet values): Objects, Array
 */

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // Accessible from all resolver methods
  // Change context to object function, to also return the request headers
  // and make them accessible inside resolver methods
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  // Configured to use fragments inside resolvers
  fragmentReplacements,
});

module.exports = server;
