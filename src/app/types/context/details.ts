import { type CardDetailsProps } from '../card.ts';

export interface DetailsContextProps {
  details: CardDetailsProps[];
  setDetails: (allDetailsData: CardDetailsProps[]) => void;
  addDetails: (detailsData: CardDetailsProps) => void;
}

enum DetailsActionType {
  SET = 'SET',
  ADD = 'ADD',
}

export interface DetailsActionProps {
  type: DetailsActionType | string;
  payload: CardDetailsProps | CardDetailsProps[] | number;
}
