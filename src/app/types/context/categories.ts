import {
  type CardGenericProps,
  type CardGenericObjectProps,
} from '../../types/card.ts';

enum CategoryActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface CategoriesContextProps {
  categories: CardGenericObjectProps;
  setCategories: (categoriesData: CardGenericObjectProps | null) => void;
  addCategory: (categoryData: CardGenericObjectProps) => void;
  updateCategory: (id: string, image: string) => void;
  deleteCategory: (id: string) => void;
}

export interface CategoryActionProps {
  type: CategoryActionType | string;
  payload:
    | CardGenericProps
    | Partial<CardGenericProps>
    | CardGenericObjectProps
    | null;
}

export interface CategoryUpdatePayload {
  id: string;
  image: string;
}
