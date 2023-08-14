const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/', homeRoutes);

module.exports = router;
