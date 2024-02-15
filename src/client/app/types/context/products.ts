import { ProductProps } from '../components/card/card-product';

enum ProductsActionType {
  SET = 'SET',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export interface ProductsContextProps {
  products: ProductProps[];
  setProducts: (productsData: ProductProps[]) => void;
  addProducts: (productData: ProductProps) => void;
  deleteProduct: (id: number) => void;
}

export interface ProductsActionProps {
  type: ProductsActionType | string;
  payload: ProductProps[] | ProductProps | number;
}
