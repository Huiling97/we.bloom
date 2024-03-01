import { cartItemsMock } from '../cart-mock';

export const mockCartContextValue = {
  cartItems: cartItemsMock,
  setCartItems: jest.fn(),
  incrementCartItem: jest.fn(),
  decrementCartItem: jest.fn(),
  deleteCartItem: jest.fn(),
};
