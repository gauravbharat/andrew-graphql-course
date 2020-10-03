// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const getUserId = (request, requireAuth = true) => {
  // For Queries or Mutations, take from header. For Subscriptions, from context
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECTRE);
    return decoded.userId;
  }

  if (requireAuth) throw new Error('Authentication required');

  return null;
};

module.exports = getUserId;
