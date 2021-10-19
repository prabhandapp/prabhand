const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please mention Order Name'],
  },
  description: String,
  income: {
    type: Number,
    required: [true, 'Please mention income for Order'],
  },
  day: Number,
  month: String,
  orderDate: Date,

  expense: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  expenseDetail: [
    {
      item: String,
      price: Number,
    },
  ],
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
