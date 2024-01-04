import { type ChangeEvent } from 'react';
import { type CardCategoryProps } from './card/card-category.ts';
import { type CardDetailsProps } from './card/card-service-details.ts';

export type FormComponentProps = {
  formId: string;
  categories: string[];
  service: CardServiceFormInputProps;
  catgeoryData: CardCategoryProps;
};

export type CardCategoryFormProps = {
  catgeoryData: CardCategoryProps;
};

export type CardServiceFormProps = {
  formId: string;
  categories: string[];
  service: CardServiceFormInputProps;
};

export type CardServiceFormInputProps = {
  id: string;
  category: string;
  name: string;
  description: string;
  details: CardDetailsProps[];
};

export type ServiceDetailsFormProps = {
  id?: string;
  index: number;
  data?: CardDetailsProps;
  onDetailsChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    input?: CardDetailsProps
  ) => void;
  onDetailsDelete: (index: number) => void;
};

export type AuthFormProps = {
  formId: string;
};
