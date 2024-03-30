import { type CardCategoryObjectProps } from '../types/components/card/card-category.ts';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';
import { CategoryTypesContextProps } from '../types/context/categoryTypes.ts';
import { CategoriesContextProps } from '../types/context/categories.ts';

const getCategories = (
  setCategoryTypes: CategoryTypesContextProps['setCategoryTypes'],
  setCategories: CategoriesContextProps['setCategories'],
  setIsLoading?: (loading: boolean) => void
) => {
  const categoriesRef = ref(database, 'categories');

  try {
    setIsLoading && setIsLoading(true);
    onValue(categoriesRef, (snapshot) => {
      if (snapshot) {
        const data = snapshot.val() as CardCategoryObjectProps;
        if (data) {
          const updatedTypes = Object.keys(data);
          setCategoryTypes(updatedTypes);
          setCategories(data);
          setIsLoading && setIsLoading(false);
        }
      } else {
        setIsLoading && setIsLoading(false);
        throw new Error('Unable to fetch categories');
      }
    });
  } catch (e) {
    setIsLoading && setIsLoading(false);
    throw new Error('Unable to fetch categories');
  }
};

export default getCategories;
