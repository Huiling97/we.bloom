import {
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../card.ts';

enum ServiceActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

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

export interface ServiceActionProps {
  type: ServiceActionType | string;
  payload:
    | CardDetailedFormInputProps
    | ServiceDeletePayload
    | ServiceUpdatePayload
    | CardServicesProps;
}

export interface ServiceUpdatePayload {
  serviceData: CardDetailedFormInputProps;
  updatedServiceData: CardDetailedFormInputProps;
}

export interface ServiceDeletePayload {
  id: string;
  categoryKey: string;
}
