const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (msg, type) => {
  hideAlert();
  const html = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', html);
  window.setTimeout(hideAlert, 5000);
};

const loaderDisplay = () => {
  const loader = document.getElementById('loader');
  loader.classList.toggle('loader-hide');
};

export { showAlert, loaderDisplay };
