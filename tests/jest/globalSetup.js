/** Start graphql server */
const server = require('../../src/server');
module.exports = async () => {
  global.httpserver = await server.start({ port: 4000 }, () => {
    'graphql server started by jest';
  });
};
