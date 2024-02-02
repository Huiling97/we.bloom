enum CategoryTypesActionType {
  SET = 'SET',
}

export interface CategoryTypesContextProps {
  categoryTypes: string[];
  setCategoryTypes: (categoryTypesData: string[]) => void;
}

export interface CategoryTypesActionProps {
  type: CategoryTypesActionType | string;
  payload: string[];
}
