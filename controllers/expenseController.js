const Expense = require('../models/expenseModel');
const catchAsync = require('../utils/catchAsync');

exports.allExpense = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find({}).sort({ orderDate: -1 });
  if (req.originalUrl.startsWith('/api')) {
    res.status(200).json({
      success: 'success',
      data: expenses,
    });
  } else {
    req.expenses = expenses;
    res.locals.expenses = expenses;
    next();
  }
});

exports.getExpenseById = catchAsync(async (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    const expense = await Expense.findById(req.params.id);
    res.status(200).json({
      success: 'success',
      data: expense,
    });
  }
});

exports.addExpense = catchAsync(async (req, res, next) => {
  req.body.expenseDetail = [];
  const newExpense = await Expense.create(req.body);
  res.status(200).json({
    success: 'success',
    data: newExpense,
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).json({
    success: 'success',
    data: null,
  });
});

exports.stats = catchAsync(async (req, res, next) => {
  const data = await Expense.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: { $sum: '$income' },
        totalBalance: { $sum: '$balance' },
        totalExpense: { $sum: '$expense' },
      },
    },
  ]);

  if (data[0]) res.locals.stats = data[0];
  else res.locals.stats = { totalIncome: 0, totalBalance: 0, totalExpense: 0 };
  next();
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const updateData = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: 'success',
    data: updateData,
  });
});
