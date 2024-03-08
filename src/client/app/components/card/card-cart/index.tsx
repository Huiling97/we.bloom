import { CartItemsProps } from '../../../types/context/cart';
import { formatPrice } from '../../../util/format-helper';

const quantityButtons = (quantity: number) => {
  return (
    <div className='quantity-buttons-container'>
      <div className='quantity-button quantity-button--right'>-</div>
      <div className='padding-center'>{quantity}</div>
      <div className='quantity-button quantity-button--left'>+</div>
    </div>
  );
};

const CartItem = ({ cartItems }: { cartItems: CartItemsProps[] }) => {
  return cartItems.map((item, index) => {
    const { brand, name, size, price, quantity } = item;

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
              <div>{quantityButtons(quantity)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default CartItem;
