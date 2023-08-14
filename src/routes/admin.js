const express = require('express');

const anonymousMiddleware = require('./../middlewares/anonymous');
const authMiddleware = require('./../middlewares/auth');
const {
  getLogin,
  postLogin,
  getHome,
  getNewPassword,
  postNewPassword,
  getManageAdmins,
  postDeleteAdmin,
  getUpdatePassword,
  postNewAdmin,
} = require('../controllers/admin');

const router = express.Router();

router.get('/login', anonymousMiddleware(), getLogin);
router.post('/login', postLogin);

router.get('/', authMiddleware(), getHome);
router.get('/new-password', authMiddleware(), getNewPassword);
router.post('/new-password', authMiddleware(), postNewPassword);
router.get('/manage-admins', authMiddleware(), getManageAdmins);

router.post('/delete-admin', authMiddleware(), postDeleteAdmin);
router.post('/update-password', authMiddleware(), getUpdatePassword);
router.post('/new-admin', authMiddleware(), postNewAdmin);

module.exports = router;
