import axios from 'axios';
import { showAlert } from './util';

const getMenuByCategory = async (category) => {
  const url = `/api/v1/menu/${category}`;
  //const url = `/api/v1/menu/${category}`;

  try {
    const res = await axios({
      method: 'GET',
      url: url,
    });
    if (res) {
      if (res.data.success === 'success') return res.data.data.menuCategory;
    }
    return null;
  } catch (err) {
    showAlert('Error while retrieving menu', 'error');
  }
};

const getAllMenu = async () => {
  const url = `/api/v1/menu/all`;
  //const url = `/api/v1/menu/${category}`;

  try {
    const res = await axios({
      method: 'GET',
      url: url,
    });
    if (res) {
      if (res.data.success === 'success') return res.data.data.menu;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export { getMenuByCategory, getAllMenu };
