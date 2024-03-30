import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';
import { ServicesContextProps } from '../types/context/services.ts';

const fetchServicesData = (
  category: string,
  setServices: ServicesContextProps['setServices'],
  setIsLoading?: (isLoading: boolean) => void
) => {
  const serviceRef = ref(database, `services/${category}`);

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
      setIsLoading && setIsLoading(false);
    });
  } catch (e) {
    setIsLoading && setIsLoading(false);
    throw new Error('Unable to fetch services');
  }
};

export default fetchServicesData;
