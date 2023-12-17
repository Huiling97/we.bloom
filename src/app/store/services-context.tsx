import { createContext, useReducer, type ReactNode } from 'react';
import {
  type CardServicesProps,
  type CardDetailedFormInputProps,
} from '../types/card';

export interface CategoriesContextProps {
  services: CardServicesProps;
  setServices: (servicesData: CardDetailedFormInputProps) => void;
  addService: (categoryData: CardDetailedFormInputProps) => void;
}

enum ServiceActionType {
  SET = 'SET',
  ADD = 'ADD',
}

export interface ServiceActionProps {
  type: ServiceActionType | string;
  payload: CardDetailedFormInputProps;
}

const ServicesContext = createContext<CategoriesContextProps>({
  services: {},
  setServices: () => {},
  addService: () => {},
});

const servicesReducer = (state: {}, action: ServiceActionProps) => {
  switch (action.type) {
    case 'SET':
      return { ...action.payload };
    case 'ADD':
      return { ...action.payload, ...state };
    default:
      return state;
  }
};

const ServicesContextProvider = ({ children }: { children: ReactNode }) => {
  const [servicesState, dispatch] = useReducer(servicesReducer, {});

  const setServices = (servicesData: CardDetailedFormInputProps) => {
    dispatch({ type: 'SET', payload: servicesData });
  };

  const addService = (serviceData: CardDetailedFormInputProps) => {
    dispatch({ type: 'ADD', payload: serviceData });
  };

  const value = {
    services: servicesState,
    setServices: setServices,
    addService: addService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
