import {
  type CardDetailedFormInputProps,
  type CardGenericProps,
} from './card.ts';

export type FormComponentProps = {
  formId: string;
  categories: string[];
  service: CardDetailedFormInputProps;
  catgeoryData: CardGenericProps;
};

export type CardGenericFormProps = {
  catgeoryData: CardGenericProps;
};

export type AuthFormProps = {
  formId: string;
};
