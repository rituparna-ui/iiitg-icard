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
  deleteEntry,
  approveEntry,
  viewCard,
} = require('../controllers/admin/admin');
const {
  getBtechEntries,
  getMtechOncampusEntries,
  getMtechOnlineEntries,
  getPhdFullTimeEntries,
  getPhdPartTimeEntries,
  getBtechBatchwise,
  getMtechOncampusBatchwise,
  getMtechOnlineBatchwise,
  getPhdFullTimeBatchwise,
  getPhdPartTimeBatchwise,
  getBtechBatchwiseApproved,
  getBtechBatchwisePending,
  getMtechOncampusBatchwiseApproved,
  getMtechOnlineBatchwisePending,
  getPhdFullTimeBatchwiseApproved,
  getPhdPartTimeBatchwisePending,
  getMtechOncampusBatchwisePending,
  getMtechOnlineBatchwiseApproved,
  getPhdPartTimeBatchwiseApproved,
  getPhdFullTimeBatchwisePending,
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

router.get('/entries/btech/:year', authMiddleware(), getBtechBatchwise);
router.get(
  '/entries/mtech-oncampus/:year',
  authMiddleware(),
  getMtechOncampusBatchwise
);
router.get(
  '/entries/mtech-online/:year',
  authMiddleware(),
  getMtechOnlineBatchwise
);
router.get(
  '/entries/phd-full-time/:year',
  authMiddleware(),
  getPhdFullTimeBatchwise
);
router.get(
  '/entries/phd-part-time/:year',
  authMiddleware(),
  getPhdPartTimeBatchwise
);

router.get(
  '/entries/btech/:year/approved',
  authMiddleware(),
  getBtechBatchwiseApproved
);
router.get(
  '/entries/mtech-oncampus/:year/approved',
  authMiddleware(),
  getMtechOncampusBatchwiseApproved
);
router.get(
  '/entries/mtech-online/:year/approved',
  authMiddleware(),
  getMtechOnlineBatchwiseApproved
);
router.get(
  '/entries/phd-full-time/:year/approved',
  authMiddleware(),
  getPhdFullTimeBatchwiseApproved
);
router.get(
  '/entries/phd-part-time/:year/approved',
  authMiddleware(),
  getPhdPartTimeBatchwiseApproved
);

router.get(
  '/entries/btech/:year/pending',
  authMiddleware(),
  getBtechBatchwisePending
);
router.get(
  '/entries/mtech-oncampus/:year/pending',
  authMiddleware(),
  getMtechOncampusBatchwisePending
);
router.get(
  '/entries/mtech-online/:year/pending',
  authMiddleware(),
  getMtechOnlineBatchwisePending
);
router.get(
  '/entries/phd-full-time/:year/pending',
  authMiddleware(),
  getPhdFullTimeBatchwisePending
);
router.get(
  '/entries/phd-part-time/:year/pending',
  authMiddleware(),
  getPhdPartTimeBatchwisePending
);

router.post('/delete', authMiddleware(), deleteEntry);
router.post('/approve', authMiddleware(), approveEntry);

router.post('/view-card', authMiddleware(), viewCard);

module.exports = router;
