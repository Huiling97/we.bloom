import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CardServicesProps,
  type CardDetailedFormInputProps,
} from '../types/card';
import {
  ServiceActionProps,
  ServiceDeletePayload,
} from '../types/context/services.ts';

export interface ServicesContextProps {
  services: CardServicesProps;
  setServices: (servicesData: CardServicesProps) => void;
  addService: (categoryData: CardDetailedFormInputProps) => void;
  deleteService: (categoryKey: string, id: string) => void;
}

const ServicesContext = createContext<ServicesContextProps>({
  services: {},
  setServices: () => {},
  addService: () => {},
  deleteService: () => {},
});

const servicesReducer = (state: {}, action: ServiceActionProps) => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload };
    case 'ADD':
      return { ...action.payload, ...state };
    case 'DELETE':
      const { categoryKey, id } = action.payload as ServiceDeletePayload;
      const categoryServices = (state as CardServicesProps)[categoryKey];
      if (categoryServices) {
        const updatedServices = categoryServices.filter(
          (service: CardDetailedFormInputProps) => service.id !== id
        );
        return {
          ...state,
          [categoryKey]: updatedServices,
        };
      }
      return state;
    default:
      return state;
  }
};

const ServicesContextProvider = ({ children }: { children: ReactNode }) => {
  const [servicesState, dispatch] = useReducer(servicesReducer, {});

  const setServices = (servicesData: CardServicesProps) => {
    dispatch({ type: 'SET', payload: servicesData });
  };

  const addService = (serviceData: CardDetailedFormInputProps) => {
    dispatch({ type: 'ADD', payload: serviceData });
  };

  const deleteService = (categoryKey: string, id: string) => {
    dispatch({ type: 'DELETE', payload: { categoryKey, id } });
  };

  const value = {
    services: servicesState,
    setServices: setServices,
    addService: addService,
    deleteService: deleteService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
