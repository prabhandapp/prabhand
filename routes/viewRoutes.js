const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/login', viewController.getLoginForm);
router.get('/home', authController.isLoggedIn, viewController.home);
router.get('/menu', authController.isLoggedIn, viewController.menu);
router.get('/print', authController.isLoggedIn, viewController.print);

module.exports = router;
