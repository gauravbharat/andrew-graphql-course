// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECTRE, { expiresIn: '7 days' });
};

module.exports = generateToken;
