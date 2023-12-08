import { useEffect, useState } from 'react';
import { type CardGenericProps } from '../../types/card.ts';
import ShowModal from '../../components/modal';
import CardGenericForm from '../../components/card/card-generic/form';
import CardGrid from '../../components/card/card-grid';

import { onValue, ref } from 'firebase/database';
import { database } from '../../../main';

import CardDetailedForm from '../../components/card/card-detailed/form.tsx';

const AllServices = () => {
  const [categoriesData, setCategoriesData] = useState<CardGenericProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');

    const fetchData = () => {
      try {
        onValue(categoriesRef, (snapshot) => {
          if (snapshot) {
            const data = snapshot.val() as CardGenericProps;
            setCategoriesData(data);
          } else {
            throw new Error('Unable to fetch categories');
          }
          setIsLoading(false);
        });
      } catch (e) {
        setIsLoading(false);
        throw new Error('Unable to fetch categories');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ShowModal heading='Add new cateogry' form={CardDetailedForm} />
      <ShowModal heading='Add new cateogry' form={CardGenericForm} />
      {isLoading || !categoriesData ? (
        <p>Loading</p>
      ) : (
        <CardGrid type='generic' cards={categoriesData} />
      )}
    </div>
  );
};

export default AllServices;
