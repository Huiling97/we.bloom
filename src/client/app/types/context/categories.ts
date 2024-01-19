import {
  type CardCategoryProps,
  CardCategoryObjectProps,
} from '../components/card/card-category.ts';

enum CategoryActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface CategoriesContextProps {
  categories: CardCategoryObjectProps;
  setCategories: (categoriesData: CardCategoryObjectProps | null) => void;
  addCategory: (categoryData: CardCategoryObjectProps) => void;
  updateCategory: (id: string, image: string) => void;
  deleteCategory: (id: string) => void;
}

export interface CategoryActionProps {
  type: CategoryActionType | string;
  payload:
    | CardCategoryProps
    | Partial<CardCategoryProps>
    | CardCategoryObjectProps
    | null;
}

export interface CategoryUpdatePayload {
  id: string;
  image: string;
}
