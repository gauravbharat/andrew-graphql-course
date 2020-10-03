// import getUserId from '../utils/getUserId.js';
const getUserId = require('../utils/getUserId');

/** Lock down individual type fields */
const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request, prisma }, info) {
      const userId = getUserId(request);
      if (userId && userId === parent.id) {
        return parent.posts;
      } else {
        if (parent.posts.length > 0) {
          const filteredPosts = parent.posts.filter(
            (post) => post.published === true
          );
          return filteredPosts;
        }
        return [];
      }

      // return prisma.query.posts({
      //   where: {
      //     published: true,
      //     author: {
      //       id: parent.id,
      //     },
      //   },
      // });
    },
  },
};

module.exports = User;

// export default User;
