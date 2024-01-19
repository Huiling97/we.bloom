import { type CardServiceObjectProps } from '../components/card/card-service.ts';
import { type CardServiceFormInputProps } from '../components/form.ts';

enum ServiceActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ServicesContextProps {
  services: CardServiceObjectProps;
  setServices: (servicesData: CardServiceObjectProps) => void;
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
    | CardServiceObjectProps;
}

export interface ServiceUpdatePayload {
  serviceData: CardServiceFormInputProps;
  updatedServiceData: CardServiceFormInputProps;
}

export interface ServiceDeletePayload {
  id: string;
  categoryKey: string;
}
