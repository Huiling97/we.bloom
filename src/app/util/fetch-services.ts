import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../store/services-context.tsx';
import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';

const fetchServicesData = (category: string) => {
  const [isLoading, setIsLoading] = useState(true);

  const { setServices, services } = useContext(ServicesContext);

  const serviceRef = ref(database, `services/${category}`);

  useEffect(() => {
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
  }, []);

  return { isLoading, services };
};

export default fetchServicesData;
