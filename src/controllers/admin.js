const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Admin = require('./../models/admin');
const { JWT_SECRET } = require('../utils/constants');

exports.getLogin = asyncHandler(async (req, res, next) => {
  return res.render('admin/login');
});

exports.postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.redirect('/admin/login');
  }
  const token = jwt.sign({ email, role: 'ADMIN' }, JWT_SECRET);
  res.cookie('token', token);
  return res.redirect('/admin');
});

exports.getHome = asyncHandler(async (req, res, next) => {
  res.render('admin/home', {
    email: req.email,
  });
});

exports.getNewPassword = asyncHandler(async (req, res, next) => {
  res.render('admin/changePassword', {
    email: req.email,
  });
});

exports.getManageAdmins = asyncHandler(async (req, res, next) => {
  const admins = await Admin.find();
  res.render('admin/manage-admins', {
    email: req.email,
    admins,
  });
});

exports.postNewPassword = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  await Admin.updateOne({ email }, { $set: { password } });
  return res.redirect('/admin');
});

exports.postDeleteAdmin = asyncHandler(async (req, res, next) => {
  const numberOfAdmins = await Admin.countDocuments();
  if (numberOfAdmins == 1) {
    return res.redirect('/admin/manage-admins');
  }
  await Admin.deleteOne({
    email: req.body.email,
  });
  return res.redirect('/admin/manage-admins');
});

exports.getUpdatePassword = asyncHandler(async (req, res, next) => {
  return res.render('admin/changePassword', {
    email: req.body.email,
  });
});

exports.postNewAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await Admin.create({
    email,
    password,
  });
  return res.redirect('/admin/manage-admins');
});
