import axios from 'axios';
import URLConstants from '../../../util/constants/url-constants';
import { useContext } from 'react';
import { ProductsContext } from '../../../store/products-context';
import { type CartItemsProps } from '../../../types/context/cart';

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

const getCartProductQuantity = (
  cartItems: CartItemsProps[],
  productId: number
) => {
  const cartProduct = cartItems.find((item) => item.product_id === productId);
  return cartProduct ? cartProduct.quantity : 0;
};

export { fetchProducts, getCartProductQuantity };
