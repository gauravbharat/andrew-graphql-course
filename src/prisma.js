// import { Prisma } from 'prisma-binding';
// import { fragmentReplacements } from './resolvers/index.js';

const { Prisma } = require('prisma-binding');
const { fragmentReplacements } = require('./resolvers/index');

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

module.exports = prisma;
// export default prisma;

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId,
//   });

//   if (!userExists) {
//     throw new Error('User not found!');
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     `{ author {id
//       name
//       email
//       posts {
//         id
//         title
//       }
//       comments {
//         text
//       }} }`
//   );

//   return post.author;
// };

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });

//   // console.log(postExists);

//   if (!postExists) {
//     throw new Error('Post not found');
//   }

//   const { author } = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId,
//       },
//       data,
//     },
//     `{author {
//       id
//     name
//     email
//     posts {
//       title
//     }
//     comments {
//       text
//     }
//     }}`
//   );

//   return author;
// };

// updatePostForUser('ckfdxwjif00b30711xvjoi09s', {
//   title: 'My third post testing prisma exists',
//   body: 'testing exists for post update with shortened code',
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// createPostForUser('ckfck4ly600az0711f5a4hpy7', {
//   title: 'MY new post testing shortened code with exists',
//   body: '',
//   published: false,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// prisma.mutation
//   .updatePost({
//     where: {
//       id: 'ckfdrxgex008d0711ymm2f6xi',
//     },
//     data: {
//       body: 'lets discuss more about graphql basics',
//       published: true,
//     },
//   })
//   .then((updatedPost) => {
//     console.log(JSON.stringify(updatedPost, undefined, 2));
//     return prisma.query.post(
//       { where: { id: 'ckfdrxgex008d0711ymm2f6xi' } },
//       `{
//     id
//     title
//     body
//     published
//     author {name}
//   }`
//     );
//   })
//   .then((post) => {
//     console.log(JSON.stringify(post, undefined, 2));
//   });
