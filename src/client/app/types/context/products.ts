import { Dispatch, SetStateAction } from 'react';
import { ProductProps } from '../components/card/card-product';

enum ProductsActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ProductsContextProps {
  products: ProductProps[];
  setProducts: (productsData: ProductProps[]) => void;
  selectedProduct: ProductProps | {};
  setSelectedProduct: Dispatch<SetStateAction<ProductProps | {}>>;
  addProducts: (productData: ProductProps) => void;
  updateProduct: (productData: ProductProps) => void;
  deleteProduct: (id: number) => void;
}

export interface ProductsActionProps {
  type: ProductsActionType | string;
  payload: ProductProps[] | ProductProps | number;
}
