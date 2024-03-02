import { ReactNode, createContext, useReducer } from 'react';
import {
  type CartItemsProps,
  type CartContextProps,
  type CartActionProps,
  type CartUpdatePayload,
} from '../types/context/cart';
import { getCartItemByProductId } from '../components/card/card-product/helpers';

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
      const { id, price } = action.payload as CartUpdatePayload;
      const itemToIncrement = getCartItemByProductId(state, id);

      if (itemToIncrement) {
        return state.map((item) => {
          if (item.product_id === id) {
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
          { cart_id: 1, product_id: id, quantity: 1, total_price: price },
        ];
      }
    }
    case 'DECREMENT': {
      const { id, price } = action.payload as CartUpdatePayload;
      const itemToDecrement = getCartItemByProductId(state, id);

      if (itemToDecrement && itemToDecrement?.quantity > 1) {
        return state.map((item) => {
          if (item.product_id === id) {
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
        return state.filter((item) => item.product_id !== id);
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

  const incrementCartItem = (id: number, price: number) => {
    dispatch({ type: 'INCREMENT', payload: { id, price } });
  };

  const decrementCartItem = (id: number, price: number) => {
    dispatch({ type: 'DECREMENT', payload: { id, price } });
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
