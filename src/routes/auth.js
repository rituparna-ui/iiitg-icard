const express = require('express');

const { getLogin, getGoogle, postLogout } = require('../controllers/auth');
const anonymousMiddleware = require('./../middlewares/anonymous');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();

router.get('/login', anonymousMiddleware(), getLogin);
router.get('/google', anonymousMiddleware(), getGoogle);
router.post('/logout', authMiddleware(), postLogout);

module.exports = router;
