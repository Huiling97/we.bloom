import { useContext } from 'react';
import { formatPrice } from '../../../util/format-helper';
import { addItemHandler, removeItemHandler } from '../card-product/helpers';
import { CartContext } from '../../../store/cart-context';
import { type CartItemsProps } from '../../../types/context/cart';

const quantityButtons = (item: CartItemsProps) => {
  const { incrementCartItem, decrementCartItem } = useContext(CartContext);

  return (
    <div className='quantity-buttons-container'>
      <div
        className='quantity-button quantity-button--right'
        onClick={() => removeItemHandler(item, decrementCartItem)}
      >
        -
      </div>
      <div className='padding-center'>{item.quantity}</div>
      <div
        className='quantity-button quantity-button--left'
        onClick={() => addItemHandler(item, incrementCartItem)}
      >
        +
      </div>
    </div>
  );
};

const CartItem = ({ cartItems }: { cartItems: CartItemsProps[] }) => {
  return cartItems.map((item, index) => {
    const { brand, name, size, price } = item;

    return (
      <div key={index} className='cart-item-container'>
        <div className='font-bold'>{brand}</div>
        <div className='cart-item-details-container'>
          <img src='image4.jpg' className='cart-image' />
          <div>
            <div className='font-bold font-large'>{name}</div>
            <div className='font-grey cart-item-details'>
              <div>{size}</div>
              <div>${formatPrice(price)}</div>
              <div>{quantityButtons(item)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default CartItem;
