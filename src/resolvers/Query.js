// import getUserId from '../utils/getUserId.js';
const getUserId = require('../utils/getUserId');

// Query Resolvers
const Query = {
  // resolver functions gets four arguments - parent, operational arguments supplied, app contextual data and information on operational arguments sent to the server
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return await prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    let first, skip, after;

    if (args.pagination) {
      first = args.pagination.first;
      skip = args.pagination.skip;
      after = args.pagination.after;
    }

    const opArgs = {
      first,
      skip,
      after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId,
        },
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query },
      ];
    }

    return await prisma.query.posts(opArgs, info);
  },
  async post(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return posts[0];
  },
  async users(parent, args, { prisma }, info) {
    let first, skip, after;

    if (args.pagination) {
      first = args.pagination.first;
      skip = args.pagination.skip;
      after = args.pagination.after;
    }

    const opArgs = {
      first,
      skip,
      after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }],
      };
    }

    return await prisma.query.users(opArgs, info);
  },

  async posts(parent, args, { prisma }, info) {
    let first, skip, after;

    if (args.pagination) {
      first = args.pagination.first;
      skip = args.pagination.skip;
      after = args.pagination.after;
    }

    const opArgs = {
      first,
      skip,
      after,
      orderBy: args.orderBy,
      where: {
        published: true,
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query },
      ];
    }

    return await prisma.query.posts(opArgs, info);
  },

  async comments(parent, args, { prisma }, info) {
    let first, skip, after;

    if (args.pagination) {
      first = args.pagination.first;
      skip = args.pagination.skip;
      after = args.pagination.after;
    }

    const opArgs = {
      first,
      skip,
      after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        text_contains: args.query,
      };
    }

    return await prisma.query.comments(opArgs, info);
  },
};

module.exports = Query;

// export default Query;
