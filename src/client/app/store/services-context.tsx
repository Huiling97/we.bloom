import { createContext, useReducer, type ReactNode } from 'react';
import { type CardServiceObjectProps } from '../types/components/card/card-service.ts';
import { type CardServiceFormInputProps } from '../types/components/form.ts';
import {
  ServicesContextProps,
  ServiceActionProps,
  ServiceUpdatePayload,
  ServiceDeletePayload,
} from '../types/context/services.ts';

const ServicesContext = createContext<ServicesContextProps>({
  services: {},
  setServices: () => {},
  addService: () => {},
  updateService: () => {},
  deleteService: () => {},
});

const servicesReducer = (
  state: CardServiceObjectProps,
  action: ServiceActionProps
): CardServiceObjectProps => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload } as CardServiceObjectProps;
    case 'ADD':
      return { ...action.payload, ...state } as CardServiceObjectProps;
    case 'UPDATE': {
      const { serviceData, updatedServiceData } =
        action.payload as ServiceUpdatePayload;
      const serviceList = (state as CardServiceObjectProps)[
        serviceData.category
      ];
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
    }
    case 'DELETE': {
      const { categoryKey, id } = action.payload as ServiceDeletePayload;
      const categoryServices = (state as CardServiceObjectProps)[categoryKey];
      if (categoryServices) {
        const updatedServices = categoryServices.filter(
          (service: CardServiceFormInputProps) => service.id !== id
        );
        return {
          ...state,
          [categoryKey]: updatedServices,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const ServicesContextProvider = ({ children }: { children: ReactNode }) => {
  const [servicesState, dispatch] = useReducer(servicesReducer, {});

  const setServices = (servicesData: CardServiceObjectProps) => {
    dispatch({ type: 'SET', payload: servicesData });
  };

  const addService = (serviceData: CardServiceFormInputProps) => {
    dispatch({ type: 'ADD', payload: serviceData });
  };

  const updateService = (
    serviceData: CardServiceFormInputProps,
    updatedServiceData: CardServiceFormInputProps
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
