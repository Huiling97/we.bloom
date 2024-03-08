import { useContext } from 'react';
import axios from 'axios';
import URLConstants from '../../../util/constants/url-constants';
import { ProductsContext } from '../../../store/products-context';
import { formatPrice } from '../../../util/format-helper';
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

const getCartProducts = (
  cartList: CartItemsProps[],
  productList: ProductProps[]
) => {
  return cartList.map((item) =>
    productList.find((product) => product.id === item.id)
  );
};

const getCartTotalPrice = (cartItems: CartItemsProps[]) => {
  const total = cartItems.reduce(
    (acc, currItem) => acc + currItem.total_price,
    0
  );
  return formatPrice(total);
};

export { fetchProducts, getCartTotalPrice, getCartProducts };
