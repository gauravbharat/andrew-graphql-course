// import getUserId from '../utils/getUserId.js';
const getUserId = require('../utils/getUserId');

const Subscription = {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      const query = {};

      if (args) {
        query.where = {
          node: {
            post: {
              id: args.postId,
            },
          },
        };
      }

      return prisma.subscription.comment(query, info);
    },
  },

  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
  user: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.user(null, info);
    },
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },
};

module.exports = Subscription;

// export default Subscription;
