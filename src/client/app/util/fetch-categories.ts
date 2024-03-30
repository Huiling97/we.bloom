import { type CardCategoryObjectProps } from '../types/components/card/card-category.ts';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';
import { CategoryTypesContextProps } from '../types/context/categoryTypes.ts';
import { CategoriesContextProps } from '../types/context/categories.ts';

const fetchCategoriesData = (
  setCategoryTypes: CategoryTypesContextProps['setCategoryTypes'],
  setCategories: CategoriesContextProps['setCategories'],
  setIsLoading?: (loading: boolean) => void
) => {
  const categoriesRef = ref(database, 'categories');

  try {
    onValue(categoriesRef, (snapshot) => {
      if (snapshot) {
        setIsLoading && setIsLoading(true);
        const data = snapshot.val() as CardCategoryObjectProps;
        if (data) {
          const updatedTypes = Object.keys(data);
          setCategoryTypes(updatedTypes);
          setCategories(data);
        }
      } else {
        throw new Error('Unable to fetch categories');
      }
      setIsLoading && setIsLoading(false);
    });
  } catch (e) {
    setIsLoading && setIsLoading(false);
    throw new Error('Unable to fetch categories');
  }
};

export default fetchCategoriesData;
