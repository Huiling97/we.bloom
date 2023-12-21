import {
  type CardDetailedFormInputProps,
  type CardGenericProps,
} from './card.ts';

export type FormComponentProps = {
  formId: string;
  categories: string[];
  service: CardDetailedFormInputProps;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};

export type CardGenericFormProps = {
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};
