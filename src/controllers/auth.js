const oauth2Client = require('../utils/oauth/client');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

exports.getLogin = asyncHandler(async (req, res, next) => {
  res.render('auth/login', {
    errors: [],
  });
});

exports.postLogout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  return res.redirect('/');
});

exports.getGoogle = asyncHandler(async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect('/login');
  }
  const { tokens } = await oauth2Client.getToken(code);
  const payload = jwt.decode(tokens.id_token);
  const email = payload.email;
  if (!email.endsWith('iiitg.ac.in')) {
    return res.render('auth/login', {
      errors: ['Please login using Institute Email'],
    });
  }
  const token = jwt.sign({ email }, JWT_SECRET);
  res.cookie('token', token);
  return res.redirect('/');
});
