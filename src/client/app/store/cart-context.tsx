import { ReactNode, createContext, useReducer } from 'react';
import {
  type CartItemsProps,
  type CartContextProps,
  type CartActionProps,
} from '../types/context/cart';

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  setCartItems: () => {},
});

const cartReducer = (
  state: CartItemsProps[],
  action: CartActionProps
): CartItemsProps[] => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemsState, dispatch] = useReducer(cartReducer, []);

  const setCartItems = (items: CartItemsProps[]) => {
    dispatch({ type: 'GET', payload: items });
  };

  const value = {
    cartItems: cartItemsState,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartContextProvider };
