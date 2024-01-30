import { ProductProps } from '../components/card/card-product';

enum ProductsActionType {
  SET = 'SET',
  ADD = 'ADD',
}

export interface ProductsContextProps {
  products: ProductProps[];
  setProducts: (productsData: ProductProps[]) => void;
  addProducts: (productData: ProductProps) => void;
}

export interface ProductsActionProps {
  type: ProductsActionType | string;
  payload: ProductProps[] | ProductProps;
}
