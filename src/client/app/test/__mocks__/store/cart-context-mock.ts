import { cartItemsMock } from '../cart-mock';

export const mockCartContextValue = {
  cartItems: cartItemsMock,
  setCartItems: jest.fn(),
};
