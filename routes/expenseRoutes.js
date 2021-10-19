const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();
router.get('/all', expenseController.allExpense);
router.post('/', expenseController.addExpense);
router.delete('/:id', expenseController.deleteExpense);
router.get('/stats', expenseController.stats);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.updateExpense);

module.exports = router;
