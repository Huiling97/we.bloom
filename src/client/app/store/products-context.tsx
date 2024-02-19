import { ReactNode, createContext, useReducer, useState } from 'react';
import {
  type ProductsContextProps,
  type ProductsActionProps,
} from '../types/context/products';
import { type ProductProps } from '../types/components/card/card-product';

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => {},
  selectedProduct: {},
  setSelectedProduct: () => {},
  addProducts: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
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
    case 'UPDATE':
      const productData = action.payload as ProductProps;
      const productIndex = state.findIndex(
        (product) => (product.id = productData.id)
      );

      if (productIndex !== -1) {
        state[productIndex] = productData;
      }
      return state;
    case 'DELETE':
      return state.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsState, dispatch] = useReducer(productsReducer, []);
  const [selectedProduct, setSelectedProduct] = useState({});

  const setProducts = (productsData: ProductProps[]) => {
    dispatch({ type: 'SET', payload: productsData });
  };

  const addProducts = (productData: ProductProps) => {
    dispatch({ type: 'ADD', payload: productData });
  };

  const updateProduct = (productData: ProductProps) => {
    dispatch({ type: 'UPDATE', payload: productData });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const value = {
    products: productsState,
    setProducts: setProducts,
    selectedProduct,
    setSelectedProduct,
    addProducts: addProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
