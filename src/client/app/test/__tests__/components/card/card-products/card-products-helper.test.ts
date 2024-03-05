import { getCartTotalPrice } from '../../../../../components/card/card-product/helpers';
import { cartItemsMock } from '../../../../__mocks__/cart-mock';

describe('getCartTotalPrice', () => {
  it('should return the sum of the total price of all items in the cart', () => {
    expect(getCartTotalPrice(cartItemsMock)).toBeCloseTo(21.99, 2);
  });
});
