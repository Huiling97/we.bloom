import { useContext } from 'react';
import axios from 'axios';
import URLConstants from '../../../util/constants/url-constants';
import { ProductsContext } from '../../../store/products-context';
import { type CartItemsProps } from '../../../types/context/cart';
import { type ProductProps } from '../../../types/components/card/card-product';

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

const getCartItemByProductId = (
  cartItems: CartItemsProps[],
  productId: number
) => cartItems.find((item) => item.product_id === productId);

const getCartProductQuantity = (
  cartItems: CartItemsProps[],
  productId: number
) => {
  const selectedCartItem = getCartItemByProductId(cartItems, productId);
  return selectedCartItem ? selectedCartItem.quantity : 0;
};

const getCartTotalPrice = (cartItems: CartItemsProps[]) =>
  cartItems.reduce((acc, currItem) => acc + currItem.total_price, 0);

const getCartTotalQuantity = (cartItems: CartItemsProps[]) =>
  cartItems.reduce((acc, currItem) => acc + currItem.quantity, 0);

const getProductByProductId = (
  productList: ProductProps[],
  product_id: number
) => productList.find((product) => product.id === product_id);

export {
  fetchProducts,
  getCartItemByProductId,
  getCartProductQuantity,
  getCartTotalPrice,
  getCartTotalQuantity,
  getProductByProductId,
};
