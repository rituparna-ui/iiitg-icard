const express = require('express');
const { getHome } = require('../controllers/home');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware(), getHome);

module.exports = router;
