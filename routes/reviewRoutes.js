const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', reviewController.feedback);

module.exports = router;
