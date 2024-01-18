import axios from 'axios';
import URLConstants from '../../../util/constants/url-constants';
import { useContext } from 'react';
import { ProductsContext } from '../../../store/products-context';

const fetchProducts = async () => {
  const { setProducts } = useContext(ProductsContext);

  try {
    const response = await axios.get(`${URLConstants.PRODUCTS_PATH}/all`);
    if (response.data) {
      setProducts(response.data);
      return response.data;
    }
  } catch (e) {
    console.log('error', e);
    throw new Error('Unable to fetch products');
  }
};

export { fetchProducts };
