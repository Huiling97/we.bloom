import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CardServicesProps,
  type CardDetailedFormInputProps,
} from '../types/card';
import {
  ServiceActionProps,
  ServiceUpdatePayload,
  ServiceDeletePayload,
} from '../types/context/services.ts';

export interface ServicesContextProps {
  services: CardServicesProps;
  setServices: (servicesData: CardServicesProps) => void;
  addService: (categoryData: CardDetailedFormInputProps) => void;
  updateService: (
    serviceData: CardDetailedFormInputProps,
    updatedServiceData: CardDetailedFormInputProps
  ) => void;
  deleteService: (categoryKey: string, id: string) => void;
}

const ServicesContext = createContext<ServicesContextProps>({
  services: {},
  setServices: () => {},
  addService: () => {},
  updateService: () => {},
  deleteService: () => {},
});

const servicesReducer = (state: {}, action: ServiceActionProps) => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload };
    case 'ADD':
      return { ...action.payload, ...state };
    case 'UPDATE':
      let { serviceData, updatedServiceData } =
        action.payload as ServiceUpdatePayload;
      const serviceList = (state as CardServicesProps)[serviceData.category];
      const serviceIndex = serviceList.findIndex(
        (service) => service.id === serviceData.id
      );

      if (serviceIndex === -1) {
        return state;
      } else {
        serviceList[serviceIndex] = updatedServiceData;
        const result = {
          ...state,
          [serviceData.category]: serviceList,
        };
        return result;
      }
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

  const updateService = (
    serviceData: CardDetailedFormInputProps,
    updatedServiceData: CardDetailedFormInputProps
  ) => {
    dispatch({ type: 'UPDATE', payload: { serviceData, updatedServiceData } });
  };

  const deleteService = (categoryKey: string, id: string) => {
    dispatch({ type: 'DELETE', payload: { categoryKey, id } });
  };

  const value = {
    services: servicesState,
    setServices: setServices,
    addService: addService,
    updateService: updateService,
    deleteService: deleteService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
