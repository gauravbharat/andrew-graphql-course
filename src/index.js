const server = require('./server');
server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('server is up');
});
