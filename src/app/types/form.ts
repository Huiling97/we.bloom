import { type CardDetailedFormInputProps } from './card.ts';

import { CardCategoryProps } from './card/card-category.ts';

export type FormComponentProps = {
  formId: string;
  categories: string[];
  service: CardDetailedFormInputProps;
  catgeoryData: CardCategoryProps;
};

export type CardCategoryFormProps = {
  catgeoryData: CardCategoryProps;
};

export type AuthFormProps = {
  formId: string;
};
