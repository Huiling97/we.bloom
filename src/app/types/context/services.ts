import {
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../card.ts';

enum ServiceActionType {
  SET = 'SET',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export interface ServiceActionProps {
  type: ServiceActionType | string;
  payload:
    | CardDetailedFormInputProps
    | ServiceDeletePayload
    | CardServicesProps;
}

export interface ServiceDeletePayload {
  id: string;
  categoryKey: string;
}
