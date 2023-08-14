const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

module.exports = () => {
  return (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return next();
      }
      const payload = jwt.verify(token, JWT_SECRET);
      req.email = payload.email;
      if (payload.role) {
        return res.redirect('/admin');
      } else {
        return res.redirect('/');
      }
    } catch (error) {
      return res.redirect('/');
    }
  };
};
