// Mutation/CRUD Resolvers
// import getUserId from '../utils/getUserId';
// import generateToken from '../utils/generateToken';
// import { hashPassword, matchPassword } from '../utils/hashPassword';

const getUserId = require('../utils/getUserId');
const generateToken = require('../utils/generateToken');
const { hashPassword, matchPassword } = require('../utils/hashPassword');

const Mutation = {
  // User CUD
  async createUser(parent, { data }, { prisma }, info) {
    const password = await hashPassword(data.password);

    /** Dropped the 2nd argument 'info' because we just need the scalar values and not the custom types.
     * Passing 'info' would throw an error because the prisma schema does not contain user or token fields.
     */
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async login(parent, args, { prisma }, info) {
    /** Dropped the 2nd argument 'info' because we just need the scalar values and not the custom types. */
    const user = await prisma.query.users({
      where: { email: args.data.email },
    });

    if (!user || user.length === 0) {
      throw new Error('Unable to login');
    }

    const { id, name, email, password } = user[0];

    const isMatch = await matchPassword(args.data.password, password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user: {
        id,
        name,
        email,
        password,
      },
      token: generateToken(id),
    };
  },

  async updateUser(parent, { data }, { prisma, request }, info) {
    const id = getUserId(request);

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password);
    }

    return await prisma.mutation.updateUser(
      {
        where: { id },
        data,
      },
      info
    );
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const id = getUserId(request);
    return await prisma.mutation.deleteUser({ where: { id } }, info);
  },

  // Post CUD
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return await prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },

  async updatePost(parent, args, { prisma, request }, info) {
    const { id, data } = args;
    const userId = getUserId(request);
    const post = await prisma.query.posts({
      where: {
        id,
        author: {
          id: userId,
        },
      },
    });

    if (!post || post.length === 0) {
      throw new Error('Unable to update post');
    }

    const postPublishedState = post[0].published;
    // Delete post comments if the published flag is set to false, from true
    if (postPublishedState && typeof data.published === 'boolean') {
      if (!data.published) {
        await prisma.mutation.deleteManyComments({
          where: {
            post: {
              id,
            },
          },
        });
      }
    }

    return await prisma.mutation.updatePost(
      {
        where: { id },
        data,
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error('Unable to delete post');
    }

    return await prisma.mutation.deletePost({ where: { id } }, info);
  },

  // Comment CUD
  async createComment(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: data.postId,
      published: true,
    });

    if (!postExists) {
      throw new Error('Unable to find post');
    }

    return await prisma.mutation.createComment(
      {
        data: {
          text: data.text,
          post: {
            connect: {
              id: data.postId,
            },
          },
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },

  async updateComment(parent, args, { prisma, request }, info) {
    const { id, data } = args;
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error('Unable to update comment');
    }

    return await prisma.mutation.updateComment(
      {
        where: { id },
        data,
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error('Unable to delete comment');
    }

    return await prisma.mutation.deleteComment({ where: { id } }, info);
  },
};

module.exports = Mutation;

// export default Mutation;
