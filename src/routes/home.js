const express = require('express');
const { getHome, postSubmitCard } = require('../controllers/home');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware(), getHome);
router.post('/submit-card', authMiddleware(), postSubmitCard);

module.exports = router;
