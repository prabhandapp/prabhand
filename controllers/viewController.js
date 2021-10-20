const Expense = require('../models/expenseModel');
const catchAsync = require('../utils/catchAsync');

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.home = (req, res, next) => {
  res.status(200).render('home', {
    title: 'Home',
  });
};

exports.menu = (req, res, next) => {
  res.status(200).render('menu', {
    title: 'Menu Update',
  });
};

exports.print = (req, res, next) => {
  res.status(200).render('print', {
    title: 'Menu Print',
  });
};

exports.bill = (req, res, next) => {
  res.status(200).render('bill', {
    title: 'Menu Bill',
  });
};

exports.expense = (req, res, next) => {
  res.status(200).render('expense', {
    title: 'Expense',
  });
};

exports.expenseItem = (req, res, next) => {
  res.status(200).render('expense_item', {
    title: 'Expense Item',
  });
};

exports.feedback = (req, res, next) => {
  res.status(200).render('feedback', {
    title: 'Feedback',
  });
};
