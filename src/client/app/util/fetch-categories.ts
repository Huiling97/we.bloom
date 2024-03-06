import { useContext, useEffect, useState } from 'react';
import { type CardCategoryObjectProps } from '../types/components/card/card-category.ts';
import { CategoriesContext } from '../store/categories-context.tsx';
import { CategoryTypesContext } from '../store/category-types-context.tsx';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

const fetchCategoriesData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { categoryTypes, setCategoryTypes } = useContext(CategoryTypesContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');

    if (categoriesRef) {
      try {
        onValue(categoriesRef, (snapshot) => {
          if (snapshot) {
            const data = snapshot.val() as CardCategoryObjectProps;
            if (data) {
              const updatedTypes = Object.keys(data);
              setCategoryTypes(updatedTypes);
              setCategories(data);
            }
          } else {
            throw new Error('Unable to fetch categories');
          }
          setIsLoading(false);
        });
      } catch (e) {
        setIsLoading(false);
        throw new Error('Unable to fetch categories');
      }
    }
  }, []);

  return { isLoading, categories, categoryTypes };
};

export default fetchCategoriesData;
