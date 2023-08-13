const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

router.use('/auth', authRoutes);

router.use('/', homeRoutes);

module.exports = router;
