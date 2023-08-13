const express = require('express');

const { getLogin, getGoogle, postLogout } = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);
router.get('/google', getGoogle);
router.post('/logout', postLogout);

module.exports = router;
