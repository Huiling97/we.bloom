import { ReactNode, createContext, useReducer } from 'react';
import {
  type ProductsContextProps,
  type ProductsActionProps,
} from '../types/context/products';
import { type ProductProps } from '../types/components/card/card-product';

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => {},
  addProducts: () => {},
});

const productsReducer = (
  state: ProductProps[],
  action: ProductsActionProps
): ProductProps[] => {
  switch (action.type) {
    case 'SET':
      return action.payload as ProductProps[];
    case 'ADD':
      return [...state, action.payload] as ProductProps[];
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsState, dispatch] = useReducer(productsReducer, []);

  const setProducts = (productsData: ProductProps[]) => {
    dispatch({ type: 'SET', payload: productsData });
  };

  const addProducts = (productData: ProductProps) => {
    dispatch({ type: 'ADD', payload: productData });
  };

  const value = {
    products: productsState,
    setProducts: setProducts,
    addProducts: addProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
