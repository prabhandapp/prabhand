import axios from 'axios';

import { loaderDisplay, showAlert } from './util';

const renderExpenseModal = () => {
  document.getElementById('expense-modal-wrapper').classList.toggle('hidden');
};

const addExpense = async () => {
  renderExpenseModal();
  loaderDisplay();

  const name = document.getElementById('modal-expense-name').value;
  const description = document.getElementById('modal-expense-desc').value;
  const income = document.getElementById('modal-expense-income').value;
  const date = document.getElementById('modal-expense-date').value;

  const orderDate = new Date(date);
  const month = orderDate.toLocaleString('default', { month: 'short' });
  const day = orderDate.getDate();

  const url = `/api/v1/expense`;
  const data = { name, description, income, orderDate, month, day };
  try {
    const res = await axios({
      method: 'POST',
      url: url,
      data: data,
    });
    if (res.data.success === 'success') {
      loaderDisplay();
      location.assign('/expense');
    }
  } catch (err) {
    loaderDisplay();
    showAlert(err.response.data.message, 'error');
  }
};

const deleteExpense = async (id) => {
  if (confirm(`Do You Want To Delete The Expense`)) {
    loaderDisplay();
    const url = `/api/v1/expense/${id}`;

    try {
      const res = await axios({
        method: 'DELETE',
        url: url,
      });

      loaderDisplay();
      location.assign('/expense');
    } catch (err) {
      loaderDisplay();
      showAlert(err.response.data.message, 'error');
    }
  }
};

export { addExpense, renderExpenseModal, deleteExpense };
