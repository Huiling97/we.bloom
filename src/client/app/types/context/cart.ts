import { ProductProps } from '../components/card/card-product';

export type CartItemsProps = {
  id: number;
  quantity: number;
  total_price: number;
} & ProductProps;

enum CartActionType {
  SET = 'SET',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export interface CartContextProps {
  cartItems: CartItemsProps[];
  setCartItems: (items: CartItemsProps[]) => void;
  incrementCartItem: (items: CartItemsProps) => void;
  decrementCartItem: (items: CartItemsProps) => void;
}

export interface CartActionProps {
  type: CartActionType | string;
  payload: CartItemsProps[] | CartItemsProps | number;
}
