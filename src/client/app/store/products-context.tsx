import { ReactNode, createContext, useReducer } from 'react';
import {
  type ProductsContextProps,
  type ProductsActionProps,
} from '../types/context/products';
import { type ProductProps } from '../types/components/card/card-product';

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => {},
});

const productsReducer = (
  state: ProductProps[],
  action: ProductsActionProps
) => {
  switch (action.type) {
    case 'SET':
      return [...action.payload];
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsState, dispatch] = useReducer(productsReducer, []);

  const setProducts = (productsData: ProductProps[]) => {
    dispatch({ type: 'SET', payload: productsData });
  };

  const value = {
    products: productsState,
    setProducts: setProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
