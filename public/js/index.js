import '@babel/polyfill';
import { renderLoginInput, login } from './login';
import {
  updateMenuModalDisplay,
  updateMenuSelection,
  updateMenuAction,
  addMenu,
} from './updateMenu';

import { renderMenu, printMenu } from './printMenu';

// Login Interface
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.querySelector('.login-form');
if (usernameInput) {
  usernameInput.addEventListener('blur', (e) => {
    renderLoginInput(usernameInput);
  });
}

if (passwordInput) {
  passwordInput.addEventListener('blur', (e) => {
    renderLoginInput(passwordInput);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(usernameInput.value, passwordInput.value);
  });
}

//****************************************************************** */
//Menu Update Interface
//****************************************************************** */

//Open Add Menu
const updateAddBtn = document.getElementById('um-menu-add');
if (updateAddBtn) {
  updateAddBtn.addEventListener('click', function (e) {
    updateMenuModalDisplay();
  });
}

//Close Menu Modal
const updateModalClose = document.querySelector(
  '.um-modal-form .btn-modal--cancel'
);
if (updateModalClose) {
  updateModalClose.addEventListener('click', function (e) {
    updateMenuModalDisplay();
  });
}

// Save Menu Modal
const updateModalSave = document.querySelector(
  '.um-modal-form .btn-modal--save'
);
if (updateModalSave) {
  updateModalSave.addEventListener('click', function (e) {
    e.preventDefault();
    addMenu();
  });
}

//Category Selection
const updateCategorySelect = document.getElementById('um-select');
if (updateCategorySelect) {
  updateCategorySelect.addEventListener('change', function (e) {
    updateMenuSelection(updateCategorySelect.value);
  });
}

//Update Menu Action and Input
const updateMenuContainer = document.querySelector('.um-menus');
if (updateMenuContainer) {
  updateMenuContainer.addEventListener('click', function (e) {
    updateMenuAction(e);
  });

  updateMenuContainer.addEventListener('input', function (e) {
    const parentElem = e.target.parentElement;
    if (!parentElem.classList.contains('um-item-input')) {
      parentElem.classList.add('um-item-input');
    }
  });
}

//****************************************************************** */
//Menu Print Interface
//****************************************************************** */

const printCategorySelection = document.getElementById('pm-select');
if (printCategorySelection) {
  printCategorySelection.addEventListener('change', function (e) {
    e.preventDefault();
    renderMenu(printCategorySelection.value);
  });
}

const btnPrint = document.querySelector('.pm-btn-print');
if (btnPrint) {
  btnPrint.addEventListener('click', function (e) {
    e.preventDefault();
    printMenu();
  });
}
