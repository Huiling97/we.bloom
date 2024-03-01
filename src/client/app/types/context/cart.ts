export type CartItemsProps = {
  cart_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
};

enum CartActionType {
  SET = 'SET',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  DELETE = 'DELETE',
}

export interface CartContextProps {
  cartItems: CartItemsProps[];
  setCartItems: (items: CartItemsProps[]) => void;
  incrementCartItem: (id: number, price: number) => void;
  decrementCartItem: (id: number) => void;
  deleteCartItem: (id: number) => void;
}

export interface CartActionProps {
  type: CartActionType | string;
  payload: CartItemsProps[] | number | CartIncrementPayload;
}

export interface CartIncrementPayload {
  id: number;
  price: number;
}
