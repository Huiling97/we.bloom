import { useEffect, useState } from 'react';
import { type CardGenericObjectProps } from '../../app/types/card.ts';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

const fetchCategoriesData = () => {
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [categories, setCategories] = useState<CardGenericObjectProps | null>(
    null
  );
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
