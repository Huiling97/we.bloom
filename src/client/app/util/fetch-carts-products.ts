import axios from 'axios';
import URLConstants from './constants/url-constants';

const fetchCartsProducts = async () => {
  try {
    const response = await axios.get(`${URLConstants.CART_PRODUCTS_PATH}/all`);
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching cart products');
  }
};

export { fetchCartsProducts };
