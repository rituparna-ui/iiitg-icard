const express = require('express');

const { getLogin, getGoogle, postLogout, postRequestOtp, postLogin } = require('../controllers/auth');
const anonymousMiddleware = require('./../middlewares/anonymous');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();

router.get('/login', anonymousMiddleware(), getLogin);
router.post('/login', postLogin);
router.get('/google', anonymousMiddleware(), getGoogle);
router.post('/logout', authMiddleware(), postLogout);

router.post('/request-otp',postRequestOtp)

module.exports = router;
