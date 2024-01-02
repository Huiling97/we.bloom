import { type CardServicesProps } from '../card.ts';
import { type CardServiceFormInputProps } from '../form.ts';

enum ServiceActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ServicesContextProps {
  services: CardServicesProps;
  setServices: (servicesData: CardServicesProps) => void;
  addService: (categoryData: CardServiceFormInputProps) => void;
  updateService: (
    serviceData: CardServiceFormInputProps,
    updatedServiceData: CardServiceFormInputProps
  ) => void;
  deleteService: (categoryKey: string, id: string) => void;
}

export interface ServiceActionProps {
  type: ServiceActionType | string;
  payload:
    | CardServiceFormInputProps
    | ServiceDeletePayload
    | ServiceUpdatePayload
    | CardServicesProps;
}

export interface ServiceUpdatePayload {
  serviceData: CardServiceFormInputProps;
  updatedServiceData: CardServiceFormInputProps;
}

export interface ServiceDeletePayload {
  id: string;
  categoryKey: string;
}
