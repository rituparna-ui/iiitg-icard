const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

module.exports = () => {
  return (req, res, next) => {
    try {
      if (req.role === 'ADMIN') {
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.redirect('/auth/login');
    }
  };
};
