import axios from 'axios';

import { showAlert } from './util';
const renderLoginInput = (el) => {
  el.nextSibling.classList.remove('login-input-fill');
  if (el.value !== '') {
    el.nextSibling.classList.add('login-input-fill');
  }
};

const login = async (username, password) => {
  // const url = 'http://127.0.0.1:3000/api/v1/users/login';
  const url = '/api/v1/users/login';
  const btn = document.querySelector('.login-form .btn-submit');
  try {
    btn.value = 'Logging....';
    btn.disabled = true;

    const res = await axios({
      method: 'POST',
      url: url,
      data: { username, password },
    });

    if (res.data.success === 'success') {
      showAlert('Logged in successfully', 'success');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert(err.response.data.message, 'error');
  } finally {
    btn.disabled = false;
    btn.value = 'Login';
  }
};

export { renderLoginInput, login };
