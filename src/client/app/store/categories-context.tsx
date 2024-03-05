import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CardCategoryProps,
  type CardCategoryObjectProps,
} from '../types/components/card/card-category.ts';

import {
  type CategoriesContextProps,
  type CategoryActionProps,
  type CategoryUpdatePayload,
} from '../types/context/categories.ts';

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: {},
  setCategories: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

const categoriesReducer = (state: {}, action: CategoryActionProps) => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload };
    case 'ADD':
      return { ...action.payload, ...state };
    case 'UPDATE': {
      const { id, image } = action.payload as CategoryUpdatePayload;
      const allCategories = Object.values(state);
      const editedCategory = allCategories.find(
        (category) => (category as CardCategoryProps).id === id
      ) as CardCategoryProps;
      editedCategory.image = image;
      return { ...state };
    }
    case 'DELETE': {
      const categories = Object.values(state);
      return categories.filter(
        (category) => (category as CardCategoryProps).id !== action.payload!.id
      );
    }
    default:
      return state;
  }
};

const CategoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesState, dispatch] = useReducer(categoriesReducer, {});

  const setCategories = (categoriesData: CardCategoryObjectProps | null) => {
    dispatch({ type: 'SET', payload: categoriesData });
  };

  const addCategory = (categoryData: CardCategoryObjectProps) => {
    dispatch({ type: 'ADD', payload: categoryData });
  };

  const updateCategory = (id: string, image: string) => {
    dispatch({ type: 'UPDATE', payload: { id, image } });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const value = {
    categories: categoriesState,
    setCategories: setCategories,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesContextProvider };
