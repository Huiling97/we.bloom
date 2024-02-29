export type CartItemsProps = {
  cart_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
};

enum CartActionType {
  SET = 'SET',
}

export interface CartContextProps {
  cartItems: CartItemsProps[];
  setCartItems: (items: CartItemsProps[]) => void;
}

export interface CartActionProps {
  type: CartActionType | string;
  payload: CartItemsProps[];
}
