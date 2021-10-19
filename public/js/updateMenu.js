import axios from 'axios';
import { getMenuByCategory } from './menuUtility';
import { showAlert, loaderDisplay } from './util';

const clearInput = (elem) => {
  elem.value = '';
};

//Hide/Show Modal
const updateMenuModalDisplay = () => {
  document.getElementById('um-modal-wrapper').classList.toggle('um-modal-hide');
};

const updateMenuSelection = async (category) => {
  loaderDisplay();
  const data = await getMenuByCategory(category);
  const menuContainer = document.querySelector('.um-menus');
  const html = data
    .map(function (el) {
      return `
      <div class="items" data-id = "${el._id}">
              <input
                type="text"
                name="menu-item-name"
                id="menu-item-name"
                class="item-name"
                value="${el.item}"
              />
    
              <input
                type="number"
                name="menu-item-price"
                id="menu-item-price"
                class="item-price"
                value="${el.price}"
              />
    
              <input
                type="number"
                name="menu-item-qty"
                id="menu-item-qty"
                class="item-qty"
                value="${el.qty}"
              />
    
               <i class="fas fa-save fa-3x um-save" ></i>
              <i class="fas fa-trash-alt fa-2x um-delete"></i>
            </div>
      `;
    })
    .join('');

  menuContainer.innerHTML = '';
  menuContainer.insertAdjacentHTML('afterbegin', html);

  loaderDisplay();
};

//Save New Menu
const addMenu = async () => {
  const item = document.getElementById('modal-item-name').value;
  const price = document.getElementById('modal-item-price').value;
  const qty = document.getElementById('modal-item-qty').value;
  const category = document.getElementById('um-select').value;
  clearInput(document.getElementById('modal-item-name'));
  clearInput(document.getElementById('modal-item-price'));
  clearInput(document.getElementById('modal-item-qty'));
  updateMenuModalDisplay();

  loaderDisplay();
  const url = `/api/v1/menu/add`;
  const data = { item, price, qty, category };
  try {
    const res = await axios({
      method: 'POST',
      url: url,
      data: data,
    });
    if (res) {
      loaderDisplay();
      if (res.data.success === 'success') {
        updateMenuSelection(category);
      }
    }
  } catch (err) {
    loaderDisplay();
    showAlert(err.response.data.message, 'error');
  }
};

//Update Menu Data
const updateSaveMenu = async (id, data) => {
  loaderDisplay();
  const url = `/api/v1/menu/updateMenu/${id}`;
  try {
    const res = await axios({
      method: 'PATCH',
      url: url,
      data: data,
    });
    if (res) {
      loaderDisplay();
      if (res.data.success === 'success') {
        const category = document.getElementById('um-select').value;
        updateMenuSelection(category);
      }
    }
  } catch (err) {
    loaderDisplay();
    showAlert(err.response.data.message, 'error');
  }
};

const deleteMenu = async (id, item) => {
  if (confirm(`Do you want to delete the menu ${item}`)) {
    loaderDisplay();
    const url = `/api/v1/menu/delete/${id}`;
    const category = document.getElementById('um-select').value;
    try {
      const res = await axios({
        method: 'DELETE',
        url: url,
      });
      updateMenuSelection(category);
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
    loaderDisplay();
  }
};

const updateMenuAction = async (e) => {
  const parentElem = e.target.parentElement;
  const currElem = e.target;
  if (parentElem.classList.contains('items')) {
    const id = parentElem.dataset.id;
    const item = parentElem.querySelector('#menu-item-name').value;
    if (currElem.classList.contains('um-save')) {
      const price = parentElem.querySelector('#menu-item-price').value;
      const qty = parentElem.querySelector('#menu-item-qty').value;
      updateSaveMenu(id, { item, price, qty });
    } else if (currElem.classList.contains('um-delete')) {
      deleteMenu(id, item);
    } else {
      return;
    }
  } else return;
};

export {
  updateMenuModalDisplay,
  updateMenuSelection,
  updateMenuAction,
  addMenu,
};
