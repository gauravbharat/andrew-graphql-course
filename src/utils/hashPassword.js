// import bcryptjs from 'bcryptjs';
const bcryptjs = require('bcryptjs');

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.');
  }

  return bcryptjs.hash(password, 10);
};

const matchPassword = (sendPassword, storedPassword) => {
  return bcryptjs.compare(sendPassword, storedPassword);
};

module.exports = { hashPassword, matchPassword };
