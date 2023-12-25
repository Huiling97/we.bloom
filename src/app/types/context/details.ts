import { type CardDetailsProps } from '../card.ts';

enum DetailsActionType {
  SET = 'SET',
  ADD = 'ADD',
  DELETE = 'DELETE',
}
export interface DetailsContextProps {
  details: CardDetailsProps[];
  setDetails: (allDetailsData: CardDetailsProps[]) => void;
  addDetails: (detailsData: CardDetailsProps) => void;
  deleteDetails: (index: number) => void;
}

export interface DetailsActionProps {
  type: DetailsActionType | string;
  payload: CardDetailsProps | CardDetailsProps[] | number;
}
