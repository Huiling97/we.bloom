import { waitFor } from '@testing-library/react';
import {
  addItemHandler,
  getCartTotalPrice,
  removeItemHandler,
} from '../../../../../components/card/card-product/helpers';
import {
  addCartItem,
  deleteCartItem,
  updateCartItems,
} from '../../../../../service/cart-service';
import {
  cartItemsMock,
  CartNewItemMock,
} from '../../../../__mocks__/cart-mock';

jest.mock('../../../../../service/cart-service', () => ({
  addCartItem: jest.fn(),
  deleteCartItem: jest.fn(),
  updateCartItems: jest.fn(),
}));

jest.useFakeTimers();

describe('addItemHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update and increment cart given quantity is greater than 0', async () => {
    const { id, quantity, price } = cartItemsMock[0];
    const incrementCartItem = jest.fn();

    await addItemHandler(cartItemsMock[0], incrementCartItem);

    jest.runAllTimers();

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalledTimes(1);
      expect(updateCartItems).toHaveBeenCalledWith(id, quantity + 1, price);
      expect(incrementCartItem).toHaveBeenCalledTimes(1);
      expect(incrementCartItem).toHaveBeenCalledWith(cartItemsMock[0]);
      expect(addCartItem).not.toHaveBeenCalled();
    });
  });

  it('should add and increment cart given quantity is equal to 0', async () => {
    const { id, price } = CartNewItemMock[0];
    const incrementCartItem = jest.fn();

    await addItemHandler(CartNewItemMock[0], incrementCartItem);

    jest.runAllTimers();

    await waitFor(() => {
      expect(addCartItem).toHaveBeenCalledTimes(1);
      expect(addCartItem).toHaveBeenCalledWith(id, price);
      expect(incrementCartItem).toHaveBeenCalledTimes(1);
      expect(incrementCartItem).toHaveBeenCalledWith(CartNewItemMock[0]);
      expect(updateCartItems).not.toHaveBeenCalled();
    });
  });
});

describe('removeItemHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update and decrement cart given updated quantity is greater than 0', async () => {
    const { id, quantity, price } = cartItemsMock[1];
    const decrementCartItem = jest.fn();

    await removeItemHandler(cartItemsMock[1], decrementCartItem);

    jest.runAllTimers();

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalledTimes(1);
      expect(updateCartItems).toHaveBeenCalledWith(id, quantity - 1, price);
      expect(decrementCartItem).toHaveBeenCalledTimes(1);
      expect(decrementCartItem).toHaveBeenCalledWith(cartItemsMock[1]);
      expect(deleteCartItem).not.toHaveBeenCalled();
    });
  });

  it('should delete and decrement cart given updated quantity is equal to 0', async () => {
    const { id } = cartItemsMock[0];
    const decrementCartItem = jest.fn();

    await removeItemHandler(cartItemsMock[0], decrementCartItem);

    jest.runAllTimers();

    await waitFor(() => {
      expect(deleteCartItem).toHaveBeenCalledTimes(1);
      expect(deleteCartItem).toHaveBeenCalledWith(id);
      expect(decrementCartItem).toHaveBeenCalledTimes(1);
      expect(decrementCartItem).toHaveBeenCalledWith(cartItemsMock[0]);
      expect(updateCartItems).not.toHaveBeenCalled();
    });
  });
});

describe('getCartTotalPrice', () => {
  it('should return the sum of the total price of all items in the cart', () => {
    expect(getCartTotalPrice(cartItemsMock)).toBeCloseTo(21.99, 2);
  });
});
