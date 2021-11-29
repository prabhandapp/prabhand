const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', reviewController.feedback);

router.get('/', reviewController.getReview);

module.exports = router;
