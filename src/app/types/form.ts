import { type CardServicesProps, type CardGenericProps } from './card.ts';

export type FormComponentProps = {
  onClose: () => void;
  categories: string[];
  services: CardServicesProps;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};

export type CardGenericFormProps = {
  onClose: () => void;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};
