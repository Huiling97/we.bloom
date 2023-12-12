import { useEffect, useState } from 'react';
import { type CardDetailedFormInputProps } from '../../types/card.ts';

import { onValue, ref } from 'firebase/database';
import { database } from '../../../main.tsx';

const Body = () => {
  const [services, setServices] = useState<CardDetailedFormInputProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const serviceRef = ref(database, 'services');

    const fetchServicesData = () => {
      try {
        onValue(serviceRef, (snapshot) => {
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

  console.log('servies', services);

  return <div>{isLoading ? <div>Loading</div> : <div>Body page</div>}</div>;
};

export default Body;
