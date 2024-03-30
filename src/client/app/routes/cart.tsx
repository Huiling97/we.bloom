import axios from 'axios';
import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { Button } from 'react-bootstrap';
import { CartContext } from '../store/cart-context';
import { getCartsProducts } from '../service/carts-products-service';
import CartItem from '../components/card/card-cart';
import { getCartTotalPrice } from '../components/card/card-product/helpers';
import { useNavigate } from 'react-router-dom';
import { BackLink } from '../components/link';
import URLConstants from '../util/constants/url-constants';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  const onClickHandler = () => {
    navigate('/shop');
  };

  const checkoutHandler = async () => {
    try {
      const response = await axios.post(
        `${URLConstants.CHECKOUT_PATH}/create-checkout-session`,
        { cartItems }
      );
      if (response.data) {
        window.location.href = response.data.url;
      }
    } catch (e) {
      console.error('Error checking out', e);
    }
  };

  if (isEmpty(cartItems)) {
    const fetchCartItems = async () => {
      const items = await getCartsProducts();
      setCartItems(items);
    };

    fetchCartItems();
  }

  if (!isEmpty(cartItems)) {
    return (
      <>
        <BackLink link='/shop' content='Back to shop' />
        <div className='cart-content-container'>
          <div>
            <CartItem cartItems={cartItems} />
          </div>
          <div className='subtotal-container'>
            <div className='price-details'>
              <div>SubTotal</div>
              <div className='font-bold'>${getCartTotalPrice(cartItems)}</div>
            </div>
            <Button onClick={checkoutHandler}>Continue to checkout</Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className='content-centered content-flex-column'>
      It's feeling empty here, add some items here now
      <Button variant='secondary' onClick={onClickHandler}>
        Let's go shopping
      </Button>
    </div>
  );
};

export default Cart;
