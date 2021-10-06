const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/login', viewController.getLoginForm);
router.get('/home', authController.isLoggedIn, viewController.home);
router.get('/menu', authController.isLoggedIn, viewController.menu);

module.exports = router;
