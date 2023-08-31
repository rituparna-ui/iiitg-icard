const express = require('express');

const anonymousMiddleware = require('./../middlewares/anonymous');
const authMiddleware = require('./../middlewares/auth');
const adminMiddleware = require('./../middlewares/admin');
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
  generateApplication,
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

router.get('/', authMiddleware(), adminMiddleware(), getHome);
router.get('/new-password', authMiddleware(), getNewPassword);
router.post('/new-password', authMiddleware(), postNewPassword);
router.get(
  '/manage-admins',
  authMiddleware(),
  adminMiddleware(),
  getManageAdmins
);

router.post(
  '/delete-admin',
  authMiddleware(),
  adminMiddleware(),
  postDeleteAdmin
);
router.post('/update-password', authMiddleware(), getUpdatePassword);
router.post('/new-admin', authMiddleware(), adminMiddleware(), postNewAdmin);

router.get(
  '/entries/btech',
  authMiddleware(),
  adminMiddleware(),
  getBtechEntries
);
router.get(
  '/entries/mtech-oncampus',
  authMiddleware(),
  adminMiddleware(),
  getMtechOncampusEntries
);
router.get(
  '/entries/mtech-online',
  authMiddleware(),
  adminMiddleware(),
  getMtechOnlineEntries
);
router.get(
  '/entries/phd-full-time',
  authMiddleware(),
  adminMiddleware(),
  getPhdFullTimeEntries
);
router.get(
  '/entries/phd-part-time',
  authMiddleware(),
  adminMiddleware(),
  getPhdPartTimeEntries
);

router.get(
  '/entries/btech/:year',
  authMiddleware(),
  adminMiddleware(),
  getBtechBatchwise
);
router.get(
  '/entries/mtech-oncampus/:year',
  authMiddleware(),
  adminMiddleware(),
  getMtechOncampusBatchwise
);
router.get(
  '/entries/mtech-online/:year',
  authMiddleware(),
  adminMiddleware(),
  getMtechOnlineBatchwise
);
router.get(
  '/entries/phd-full-time/:year',
  authMiddleware(),
  adminMiddleware(),
  getPhdFullTimeBatchwise
);
router.get(
  '/entries/phd-part-time/:year',
  authMiddleware(),
  adminMiddleware(),
  getPhdPartTimeBatchwise
);

router.get(
  '/entries/btech/:year/approved',
  authMiddleware(),
  adminMiddleware(),
  getBtechBatchwiseApproved
);
router.get(
  '/entries/mtech-oncampus/:year/approved',
  authMiddleware(),
  adminMiddleware(),
  getMtechOncampusBatchwiseApproved
);
router.get(
  '/entries/mtech-online/:year/approved',
  authMiddleware(),
  adminMiddleware(),
  getMtechOnlineBatchwiseApproved
);
router.get(
  '/entries/phd-full-time/:year/approved',
  authMiddleware(),
  adminMiddleware(),
  getPhdFullTimeBatchwiseApproved
);
router.get(
  '/entries/phd-part-time/:year/approved',
  authMiddleware(),
  adminMiddleware(),
  getPhdPartTimeBatchwiseApproved
);

router.get(
  '/entries/btech/:year/pending',
  authMiddleware(),
  adminMiddleware(),
  getBtechBatchwisePending
);
router.get(
  '/entries/mtech-oncampus/:year/pending',
  authMiddleware(),
  adminMiddleware(),
  getMtechOncampusBatchwisePending
);
router.get(
  '/entries/mtech-online/:year/pending',
  authMiddleware(),
  adminMiddleware(),
  getMtechOnlineBatchwisePending
);
router.get(
  '/entries/phd-full-time/:year/pending',
  authMiddleware(),
  adminMiddleware(),
  getPhdFullTimeBatchwisePending
);
router.get(
  '/entries/phd-part-time/:year/pending',
  authMiddleware(),
  adminMiddleware(),
  getPhdPartTimeBatchwisePending
);

router.post('/delete', authMiddleware(), adminMiddleware(), deleteEntry);
router.post('/approve', authMiddleware(), adminMiddleware(), approveEntry);

router.post('/view-card', authMiddleware(), adminMiddleware(), viewCard);

router.post(
  '/generate-application',
  authMiddleware(),
  adminMiddleware(),
  generateApplication
);

module.exports = router;
