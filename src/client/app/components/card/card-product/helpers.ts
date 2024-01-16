import axios from 'axios';
import URLConstants from '../../../util/constants/url-constants';

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${URLConstants.PRODUCTS_PATH}/all`);
    return response.data;
  } catch (e) {
    console.log('error', e);
    throw new Error('Unable to fetch products');
  }
};

export { fetchProducts };
