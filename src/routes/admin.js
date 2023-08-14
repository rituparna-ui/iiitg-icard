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
} = require('../controllers/admin/admin');
const {
  getBtechEntries,
  getMtechOncampusEntries,
  getMtechOnlineEntries,
  getPhdFullTimeEntries,
  getPhdPartTimeEntries,
} = require('../controllers/admin/entries');

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

router.get('/entries/btech', authMiddleware(), getBtechEntries);

router.get(
  '/entries/mtech-oncampus',
  authMiddleware(),
  getMtechOncampusEntries
);

router.get('/entries/mtech-online', authMiddleware(), getMtechOnlineEntries);

router.get('/entries/phd-full-time', authMiddleware(), getPhdFullTimeEntries);

router.get('/entries/phd-part-time', authMiddleware(), getPhdPartTimeEntries);

module.exports = router;
