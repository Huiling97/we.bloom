import { cartItemsMock } from '../../../../__mocks__/cart-mock';
import { getCartProductQuantity } from '../../../../../components/card/card-product/helpers';

describe('getCartProductQuantity', () => {
  it('should return the quantity of product given product exists in the cart', () => {
    expect(getCartProductQuantity(cartItemsMock, 1)).toBe(1);
    expect(getCartProductQuantity(cartItemsMock, 2)).toBe(2);
  });

  it('should return 0 given product does not exist in the cart', () => {
    expect(getCartProductQuantity(cartItemsMock, 3)).toBe(0);
  });
});
