import axios from 'axios';

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
    return null;
  }
};

export { getMenuByCategory };
