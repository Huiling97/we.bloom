import { type CardServicesProps, type CardGenericProps } from './card.ts';

export type FormComponentProps = {
  categories: string[];
  services: CardServicesProps;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};

export type CardGenericFormProps = {
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};
