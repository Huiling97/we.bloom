import { cartItemsMock } from '../../../../__mocks__/cart-mock';
import {
  getCartItemByProductId,
  getCartProductQuantity,
} from '../../../../../components/card/card-product/helpers';

describe('getSelectedCartItem', () => {
  it('should return the cart item by product id', () => {
    expect(getCartItemByProductId(cartItemsMock, 1)).toBe(cartItemsMock[0]);
  });
});

describe('getCartProductQuantity', () => {
  it('should return the quantity of product given product exists in the cart', () => {
    expect(getCartProductQuantity(cartItemsMock, 1)).toBe(1);
    expect(getCartProductQuantity(cartItemsMock, 2)).toBe(2);
  });

  it('should return 0 given product does not exist in the cart', () => {
    expect(getCartProductQuantity(cartItemsMock, 3)).toBe(0);
  });
});
