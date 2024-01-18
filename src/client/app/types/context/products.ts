import { ProductProps } from '../card/card-product';

enum ProductsActionType {
  SET = 'SET',
}

export interface ProductsContextProps {
  products: ProductProps[];
  setProducts: (productsData: ProductProps[]) => void;
}

export interface ProductsActionProps {
  type: ProductsActionType | string;
  payload: ProductProps[];
}
