import axios from 'axios';

const send = async () => {
  const feedbackContainer = document.querySelector('.feedback-content');
  const backContainer = document.querySelector('.feedback-content-end');
  feedbackContainer.classList.add('feedback-content-slide');
  backContainer.classList.add('feedback-content-end-slide');

  const url = `/api/v1/review`;
  const name = document.getElementById('feedback-name').value;
  const message = document.getElementById('feedback-message').value;
  let place = document.getElementById('feedback-location').value;
  if (!place) {
    place = '';
  }

  const data = { name, place, message };
  try {
    const res = await axios({
      method: 'POST',
      url: url,
      data: data,
    });
  } catch (err) {}
};

export { send };
