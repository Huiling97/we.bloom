import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CategoryTypesContextProps,
  type CategoryTypesActionProps,
} from '../types/context/categoryTypes';

const CategoryTypesContext = createContext<CategoryTypesContextProps>({
  categoryTypes: [],
  setCategoryTypes: () => {},
});

const categoryTypesReducer = (
  state: string[],
  action: CategoryTypesActionProps
) => {
  switch (action.type) {
    case 'SET':
      return [...action.payload];
    default:
      return state;
  }
};

const CategoryTypesContectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoryTypesState, dispatch] = useReducer(categoryTypesReducer, []);

  const setCategoryTypes = (categoryTypesData: string[]) => {
    dispatch({ type: 'SET', payload: categoryTypesData });
  };

  const value = {
    categoryTypes: categoryTypesState,
    setCategoryTypes: setCategoryTypes,
  };

  return (
    <CategoryTypesContext.Provider value={value}>
      {children}
    </CategoryTypesContext.Provider>
  );
};

export { CategoryTypesContext, CategoryTypesContectProvider };
