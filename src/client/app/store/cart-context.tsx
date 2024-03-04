import { ReactNode, createContext, useReducer } from 'react';
import {
  type CartItemsProps,
  type CartContextProps,
  type CartActionProps,
} from '../types/context/cart';

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  setCartItems: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
});

const cartReducer = (
  state: CartItemsProps[],
  action: CartActionProps
): CartItemsProps[] => {
  switch (action.type) {
    case 'SET':
      return action.payload as CartItemsProps[];
    case 'INCREMENT': {
      const { id, price, quantity } = action.payload as CartItemsProps;

      if (quantity) {
        return state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              total_price: (item.quantity + 1) * price,
            };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...state,
          { ...(action.payload as CartItemsProps), quantity: 1 },
        ];
      }
    }
    case 'DECREMENT': {
      const { id, price, quantity } = action.payload as CartItemsProps;

      if (quantity && quantity > 1) {
        return state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              total_price: (item.quantity - 1) * price,
            };
          } else {
            return item;
          }
        });
      } else {
        return state.filter((item) => item.id !== id);
      }
    }
    default:
      return state;
  }
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemsState, dispatch] = useReducer(cartReducer, []);

  const setCartItems = (items: CartItemsProps[]) => {
    dispatch({ type: 'SET', payload: items });
  };

  const incrementCartItem = (item: CartItemsProps) => {
    dispatch({ type: 'INCREMENT', payload: item });
  };

  const decrementCartItem = (item: CartItemsProps) => {
    dispatch({ type: 'DECREMENT', payload: item });
  };

  const value = {
    cartItems: cartItemsState,
    setCartItems,
    incrementCartItem,
    decrementCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartContextProvider };
