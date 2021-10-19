import axios from 'axios';
import { loaderDisplay, showAlert } from './util';

let id;
let curData;

const getData = async () => {
  const url = `/api/v1/expense/${id}`;
  try {
    const res = await axios({
      method: 'GET',
      url: url,
    });
    if (res.data.success === 'success') {
      return res.data.data;
    }
  } catch (err) {
    showAlert(err.response.data.message, 'error');
  }
};

const updateData = async () => {
  const url = `/api/v1/expense/${id}`;
  try {
    const res = await axios({
      method: 'PUT',
      url: url,
      data: curData,
    });
    if (res.data.success === 'success') {
      curData = res.data.data;

      renderItems();
    }
  } catch (err) {
    showAlert(err.response.data.message, 'error');
  }
};

const renderDetail = (data) => {
  document.querySelector('.item-info-name').innerHTML = `${data.name}`;
  document.querySelector('.item-info-desc').innerHTML = `${data.description}`;
};

const renderItems = () => {
  const html = curData.expenseDetail
    .map(function (el) {
      return `
        <div class="expense-item">
        <p>${el.item}</p>
        <p>${el.price}</p>
        <i class="fas fa-trash-alt fa-3x item-delete" data-id= "${el._id}"></i>
        </div>
        `;
    })
    .join('');

  const expenseItemContainer = document.querySelector('.expense-items');
  expenseItemContainer.innerHTML = '';
  expenseItemContainer.insertAdjacentHTML('afterbegin', html);

  //Update Total Expense :
  const itemTotalExpense = document.querySelector('.item-total-expense');
  itemTotalExpense.innerHTML = '';
  itemTotalExpense.innerHTML = `Total Expense : Rs${curData.expense}`;
};

const saveItems = async () => {
  loaderDisplay();
  const item = document.getElementById('item-name').value;
  const price = document.getElementById('item-price').value * 1;
  let expense = 0;

  curData.expenseDetail.push({ item, price });
  curData.expenseDetail.forEach((el) => {
    expense = expense + el.price;
  });

  curData.balance = curData.income - expense;
  curData.expense = expense;

  await updateData();

  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = '';

  loaderDisplay();
};

const deleteItems = async (itemId) => {
  console.log(itemId);
  loaderDisplay();
  const selectedItems = curData.expenseDetail.filter(function (el) {
    return el._id != itemId;
  });

  curData.expenseDetail = selectedItems;

  let expense = 0;
  curData.expenseDetail.forEach((el) => {
    expense = expense + el.price;
  });

  curData.balance = curData.income - expense;
  curData.expense = expense;

  await updateData();

  loaderDisplay();
};

const initExpenseItem = async () => {
  const path = location.pathname.split('/');
  id = path[path.length - 1];
  loaderDisplay();
  const data = await getData();
  //   console.log(data.data);
  curData = data;
  renderDetail(data);
  renderItems();
  loaderDisplay();

  //   Event Handler

  //Edit Detail Button
  const editBtn = document.querySelector('.expense-cta-edit');
  const editModal = document.querySelector('.edit-item-modal');
  editBtn.addEventListener('click', function (e) {
    e.preventDefault();

    document.getElementById('expense-detail--name').value = curData.name;
    document.getElementById('expense-detail--desc').value = curData.description;
    document.getElementById('expense-detail--income').value = curData.income;
    document.getElementById('expense-detail--date').value =
      curData.orderDate.split('T')[0];
    editModal.classList.toggle('hidden');
  });

  //Edit Form Submit
  const editForm = document.querySelector('.edit-detail-form');
  editForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    editModal.classList.toggle('hidden');
    loaderDisplay();

    curData.name = document.getElementById('expense-detail--name').value;
    curData.description = document.getElementById('expense-detail--desc').value;
    curData.income = document.getElementById('expense-detail--income').value;
    curData.balance = curData.income - curData.expense;
    curData.orderDate = new Date(
      document.getElementById('expense-detail--date').value
    );

    curData.month = curData.orderDate.toLocaleString('default', {
      month: 'short',
    });
    curData.day = curData.orderDate.getDate();

    await updateData();

    renderDetail(curData);
    loaderDisplay();
  });

  //Close Edit Button
  const closeEditBtn = document.querySelector('.edit-detail-close');
  closeEditBtn.addEventListener('click', function (e) {
    e.preventDefault();

    editModal.classList.toggle('hidden');
  });

  //Add Item Button
  const addItemBtn = document.querySelector('.expense-cta-add');
  const addItemModal = document.querySelector('.add-item-modal');
  addItemBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addItemModal.classList.toggle('hidden');
  });

  //Add Item Close
  const addItemCloseBtn = document.querySelector('.add-item-close');
  addItemCloseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addItemModal.classList.toggle('hidden');
  });

  //Save Item Button
  const saveItemForm = document.querySelector('.add-item-form');
  saveItemForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addItemModal.classList.toggle('hidden');
    saveItems();
  });

  //Expense Item Delete
  const expenseItemContainer = document.querySelector('.expense-items');
  expenseItemContainer.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('Clicked');
    if (e.target.classList.contains('item-delete')) {
      console.log('Clicked Inside');
      deleteItems(e.target.dataset.id);
    }
  });
};

export { initExpenseItem };
