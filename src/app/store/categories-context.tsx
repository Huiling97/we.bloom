import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CardGenericProps,
  type CardGenericObjectProps,
} from '../types/card.ts';

export interface CategoriesContextProps {
  categories: CardGenericObjectProps;
  setCategories: (categoriesData: CardGenericObjectProps | null) => void;
  addCategory: (categoryData: CardGenericObjectProps) => void;
  deleteCategory: (id: string) => void;
}

enum CategoryActionType {
  SET = 'SET',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export interface CategoryActionProps {
  type: CategoryActionType | string;
  payload:
    | CardGenericProps
    | Partial<CardGenericProps>
    | CardGenericObjectProps
    | null;
}

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: {},
  setCategories: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
});

const categoriesReducer = (state: {}, action: CategoryActionProps) => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload };
    case 'ADD':
      return { ...action.payload, ...state };
    case 'DELETE':
      const categories = Object.values(state);
      console.log(categories);
      return categories.filter(
        (category) => (category as CardGenericProps).id !== action.payload!.id
      );
    default:
      return state;
  }
};

const CategoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesState, dispatch] = useReducer(categoriesReducer, {});

  const setCategories = (categoriesData: CardGenericObjectProps | null) => {
    dispatch({ type: 'SET', payload: categoriesData });
  };

  const addCategory = (categoryData: CardGenericObjectProps) => {
    dispatch({ type: 'ADD', payload: categoryData });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const value = {
    categories: categoriesState,
    setCategories: setCategories,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesContextProvider };
