import { type CardDetailsProps, type DetailsProps } from '../card.ts';

export interface DetailsContextProps {
  details: DetailsProps;
  addDetails: (id: string, detailsData: CardDetailsProps) => void;
}

enum DetailsActionType {
  ADD = 'ADD',
}

export interface DetailsActionProps {
  type: DetailsActionType | string;
  payload: CardDetailsProps | DetailsAddPayload;
}

export interface DetailsAddPayload {
  id: string;
  detailsData: CardDetailsProps;
}
