const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const expenseController = require('../controllers/expenseController');

const router = express.Router();
router.get('/login', viewController.getLoginForm);
router.get('/home', authController.isLoggedIn, viewController.home);
router.get('/menu', authController.isLoggedIn, viewController.menu);
router.get('/print', authController.isLoggedIn, viewController.print);
router.get('/bill', authController.isLoggedIn, viewController.bill);
router.get(
  '/expense',

  authController.isLoggedIn,
  expenseController.stats,
  expenseController.allExpense,
  viewController.expense
);
router.get(
  '/expense/:id',
  authController.isLoggedIn,
  viewController.expenseItem
);

module.exports = router;
