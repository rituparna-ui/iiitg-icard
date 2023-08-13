const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

module.exports = () => {
  return (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.redirect('auth/login');
      }
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (error) {
      return res.redirect('auth/login');
    }
  };
};
