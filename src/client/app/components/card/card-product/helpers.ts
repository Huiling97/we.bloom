import { useContext } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import URLConstants from '../../../util/constants/url-constants';
import { ProductsContext } from '../../../store/products-context';
import { formatPrice } from '../../../util/format-helper';
import {
  updateCartItems,
  addCartItem,
  deleteCartItem,
} from '../../../service/cartService';
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

const addItemHandler = async (
  item: CartItemsProps,
  incrementCartItem: (items: CartItemsProps) => void
) => {
  const { id, quantity, price } = item;
  const updatedQuantity = quantity + 1;

  if (quantity) {
    debounce(async () => {
      await updateCartItems(id, updatedQuantity, price);
    }, 1000)();
  } else {
    await addCartItem(id, price);
  }
  incrementCartItem(item);
};

const removeItemHandler = async (
  item: CartItemsProps,
  decrementCartItem: (items: CartItemsProps) => void
) => {
  const { id, quantity, price } = item;
  const updatedQuantity = quantity - 1;

  if (updatedQuantity) {
    debounce(async () => {
      await updateCartItems(id, updatedQuantity, price);
    }, 1000)();
  } else {
    await deleteCartItem(id);
  }
  decrementCartItem(item);
};

const getCartTotalPrice = (cartItems: CartItemsProps[]) => {
  const total = cartItems.reduce(
    (acc, currItem) => acc + currItem.total_price,
    0
  );
  return formatPrice(total);
};

export { fetchProducts, addItemHandler, removeItemHandler, getCartTotalPrice };
