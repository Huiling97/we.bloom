import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import { getCartProducts } from '../components/card/card-product/helpers';
import { ProductsContext } from '../store/products-context';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const cartProductItems = getCartProducts(cartItems, products);

  return cartProductItems.map((item) => {
    return <div>{item?.name}</div>;
  });
};

export default Cart;
