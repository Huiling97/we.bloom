import { onValue, ref } from 'firebase/database';
import { database } from '../../main.tsx';
import { ServicesContextProps } from '../types/context/services.ts';

const getServices = (
  category: string,
  setServices: ServicesContextProps['setServices'],
  setIsLoading?: (isLoading: boolean) => void
) => {
  const serviceRef = ref(database, `services/${category}`);

  try {
    setIsLoading && setIsLoading(true);
    onValue(serviceRef, (snapshot) => {
      if (snapshot) {
        const data = snapshot.val();
        if (data) {
          setServices(data);
          setIsLoading && setIsLoading(false);
        }
      } else {
        setIsLoading && setIsLoading(false);
        throw new Error('Unable to fetch services');
      }
    });
  } catch (e) {
    setIsLoading && setIsLoading(false);
    throw new Error('Unable to fetch services');
  }
};

export default getServices;
