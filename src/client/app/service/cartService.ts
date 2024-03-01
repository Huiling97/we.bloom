import axios from 'axios';
import URLConstants from '../util/constants/url-constants';
import { saveToStorage } from '../util/storage-helper';

const updateItems = async (
  productId: number,
  updatedQuantity: number,
  updatedTotalPrice: number
) => {
  const response = await axios.put(`${URLConstants.CART_PRODUCTS_PATH}/all`, {
    productId,
    updatedQuantity,
    updatedTotalPrice,
  });
  if (response.data) saveToStorage('cartItems', response.data.updatedCart);
};

const addItem = async (productId: number, price: number) => {
  const response = await axios.post(`${URLConstants.CART_PRODUCTS_PATH}/all`, {
    productId,
    price,
  });
  if (response.data) saveToStorage('cartItems', response.data.updatedCart);
  return response.data;
};

const updateCartItems = async (
  productId: number,
  initialQuantity: number,
  updatedQuantity: number,
  price: number
) => {
  try {
    if (initialQuantity) {
      const updatedTotalPrice = updatedQuantity * price;
      await updateItems(productId, updatedQuantity, updatedTotalPrice);
    } else {
      await addItem(productId, price);
    }
  } catch (e) {
    console.error('Error incrementing cart item', e);
  }
};

const deleteCartItem = async (productId: number) => {
  try {
    const response = await axios.delete(
      `${URLConstants.CART_PRODUCTS_PATH}/${productId}`
    );
    if (response.data) saveToStorage('cartItems', response.data.updatedCart);
  } catch (e) {
    console.error('Error deleting cart item', e);
  }
};

export { updateCartItems, deleteCartItem };
