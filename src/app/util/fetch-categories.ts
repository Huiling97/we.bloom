import { useContext, useEffect, useState } from 'react';
import { type CardGenericObjectProps } from '../../app/types/card.ts';
import { CategoriesContext } from '../store/categories-context.tsx';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

const fetchCategoriesData = () => {
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const { categories, setCategories } = useContext(CategoriesContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');

    try {
      onValue(categoriesRef, (snapshot) => {
        if (snapshot) {
          const data = snapshot.val() as CardGenericObjectProps;
          if (data) {
            const updatedTypes = Object.keys(data);
            setCategoryType(updatedTypes);
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
  }, []);

  return { isLoading, categories, categoryType };
};

export default fetchCategoriesData;
