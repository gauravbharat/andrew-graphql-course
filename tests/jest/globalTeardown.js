/** Stop graphql server */
module.exports = async () => {
  await global.httpserver.close();
  console.log('graphql server stopped by jest');
};
