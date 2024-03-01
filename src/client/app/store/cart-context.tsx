import { ReactNode, createContext, useReducer } from 'react';
import {
  type CartItemsProps,
  type CartContextProps,
  type CartActionProps,
  type CartIncrementPayload,
} from '../types/context/cart';
import { getSelectedCartItem } from '../components/card/card-product/helpers';

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  setCartItems: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
});

const cartReducer = (state: CartItemsProps[], action: CartActionProps) => {
  switch (action.type) {
    case 'SET':
      return action.payload as CartItemsProps[];
    case 'INCREMENT':
      const { id, price } = action.payload as CartIncrementPayload;
      const itemToIncrement = getSelectedCartItem(state, id);

      if (itemToIncrement) {
        itemToIncrement.quantity++;
        return [...state, itemToIncrement];
      } else {
        return [
          ...state,
          { cart_id: 1, product_id: id, quantity: 1, total_price: price },
        ];
      }
    case 'DECREMENT':
      const productId = action.payload as number;
      const itemToDecrement = getSelectedCartItem(state, productId);

      if (itemToDecrement) {
        itemToDecrement.quantity--;
        return [...state, itemToDecrement];
      } else {
        return [
          ...state,
          { cart_id: 1, product_id: productId, quantity: 1, total_price: 9.59 },
        ];
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

  const incrementCartItem = (id: number, price: number) => {
    dispatch({ type: 'INCREMENT', payload: { id, price } });
  };

  const decrementCartItem = (id: number) => {
    dispatch({ type: 'DECREMENT', payload: id });
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
