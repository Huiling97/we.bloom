import { useEffect, useState } from 'react';
import { type CardGenericProps } from '../../app/types/card.ts';
import ShowModal from '../components/modal/index.tsx';
import CardGenericForm from '../components/card/card-generic/form.tsx';

import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

import CardDetailedForm from '../components/card/card-detailed/form.tsx';
import CardOverview from '../components/card/card-overview/index.tsx';

const Manage = () => {
  const [categoriesData, setCategoriesData] = useState<CardGenericProps | null>(
    null
  );
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');

    const fetchData = () => {
      try {
        onValue(categoriesRef, (snapshot) => {
          if (snapshot) {
            const data = snapshot.val() as CardGenericProps;
            if (data) {
              const updatedTypes = Object.keys(data);
              setCategoryType(updatedTypes);
              setCategoriesData(data);
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
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <div>
            <ShowModal heading='Add new cateogry' form={CardGenericForm} />
            <ShowModal
              heading='Add new service'
              form={CardDetailedForm}
              categories={categoryType}
            />
            {categoriesData && CardOverview(categoriesData)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
