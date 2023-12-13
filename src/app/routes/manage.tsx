import { useEffect, useState } from 'react';
import {
  type CardGenericProps,
  type CardServicesProps,
} from '../../app/types/card.ts';
import ShowModal from '../components/modal/index.tsx';
import CardGenericForm from '../components/card/card-generic/form.tsx';
import CardDetailedForm from '../components/card/card-detailed/form.tsx';
import CardOverview from '../components/card/card-overview/index.tsx';

import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

const Manage = () => {
  const [categoriesData, setCategoriesData] = useState<CardGenericProps | null>(
    null
  );
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [services, setServices] = useState<CardServicesProps>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');

    const fetchCategoriesData = () => {
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

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const servicesRef = ref(database, 'services');

    const fetchServicesData = () => {
      try {
        onValue(servicesRef, (snapshot) => {
          if (snapshot) {
            const data = snapshot.val();
            if (data) {
              setServices(data);
            }
          } else {
            throw new Error('Unable to fetch services');
          }
          setIsLoading(false);
        });
      } catch (e) {
        setIsLoading(false);
        throw new Error('Unable to fetch services');
      }
    };
    fetchServicesData();
  }, []);

  console.log('services', services);

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
              services={services}
            />
            {categoriesData && CardOverview(categoriesData)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
