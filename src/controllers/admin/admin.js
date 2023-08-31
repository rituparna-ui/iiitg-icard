const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Admin = require('../../models/admin');
const { JWT_SECRET } = require('../../utils/constants');
const Card = require('../../models/card');

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
  const numDegrees = await Promise.all([
    Card.countDocuments({ type: 1 }),
    Card.countDocuments({ type: 2, mode: 'on-campus' }),
    Card.countDocuments({ type: 2, mode: 'online' }),
    Card.countDocuments({ type: 3, mode: 'full-time' }),
    Card.countDocuments({ type: 3, mode: 'part-time' }),
  ]);

  res.render('admin/home', {
    email: req.email,
    numDegrees,
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

exports.deleteEntry = asyncHandler(async (req, res, next) => {
  await Card.deleteOne({ email: req.body.email });
  return res.redirect('/admin');
});

exports.approveEntry = asyncHandler(async (req, res, next) => {
  await Card.updateOne({ email: req.body.email }, { $set: { approved: true } });
  return res.redirect('/admin');
});

exports.viewCard = asyncHandler(async (req, res, next) => {
  const user = await Card.findOne({ email: req.body.email });
  return res.render('card-template', {
    roll: user.roll,
    name: user.name,
    programme: user.programmeFormatted,
    dateOfBirth: user.dob,
    validUpto: user.validity,
    issueNo: user.issueNo,
    blood: user.bloodGroup,
    presentAddr: user.presentAddress,
    guardiansName: user.guardiansName,
    permanentAddr: user.permenantAddress,
    emergency: user.emergencyContactFormatted,
    holders: user.holdersContactFormatted,
    email: user.email,
  });
});

exports.generateApplication = asyncHandler(async (req, res, next) => {
  const user = await Card.findOne({ email: req.body.email });
  return res.render('admin/application-template', {
    roll: user.roll,
    name: user.name.toUpperCase(),
    programme: user.programme,
    mode: user.mode,
    dob: user.dob,
    blood: user.bloodGroup,
    presentAddr: user.presentAddress,
    guardian: user.guardiansName,
    permaAddr: user.permenantAddress,
    emergency: user.emergencyContactFormatted,
    holder: user.holdersContactFormatted,
    email: user.email,
    validity: user.validity,
    issue: user.issueNo,
  });
});
