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

const getSelectedCartItem = (cartItems: CartItemsProps[], productId: number) =>
  cartItems.find((item) => item.product_id === productId);

const getCartProductQuantity = (
  cartItems: CartItemsProps[],
  productId: number
) => {
  const selectedCartItem = getSelectedCartItem(cartItems, productId);
  return selectedCartItem ? selectedCartItem.quantity : 0;
};

export { fetchProducts, getSelectedCartItem, getCartProductQuantity };
