import '@babel/polyfill';
import { renderLoginInput, login } from './login';

// Login Interface
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.querySelector('.login-form');

usernameInput.addEventListener('blur', (e) => {
  renderLoginInput(usernameInput);
});

passwordInput.addEventListener('blur', (e) => {
  renderLoginInput(passwordInput);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login(usernameInput.value, passwordInput.value);
});
