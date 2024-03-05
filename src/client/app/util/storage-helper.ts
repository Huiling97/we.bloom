import { type CartItemsProps } from '../types/context/cart';

const saveToStorage = (key: string, data: CartItemsProps[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export { saveToStorage, getFromStorage };
