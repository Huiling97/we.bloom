import {
  getCartItemByProductId,
  getCartProductQuantity,
  getCartTotalPrice,
  getProductByProductId,
} from '../../../../../components/card/card-product/helpers';
import { cartItemsMock } from '../../../../__mocks__/cart-mock';
import { productsMock } from '../../../../__mocks__/product-mock';

describe('getCartItemByProductId', () => {
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

describe('getCartTotalPrice', () => {
  it('should return the sum of the total price of all items in the cart', () => {
    expect(getCartTotalPrice(cartItemsMock)).toBeCloseTo(21.99, 2);
  });
});

describe('getProductByProductId', () => {
  it('should return the product by product id', () => {
    expect(getProductByProductId(productsMock, 1)).toBe(productsMock[0]);
  });
});
