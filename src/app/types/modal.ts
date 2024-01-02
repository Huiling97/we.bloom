import { Dispatch, type FunctionComponent, type SetStateAction } from 'react';
import { type CardDetailedFormInputProps } from './card.ts';
import { type CardCategoryProps } from './card/card-category.ts';
import { FormComponentProps } from './form.ts';

export type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  formId?: string;
  show: boolean;
  catgeoryData?: CardCategoryProps;
  categories?: string[];
  service?: CardDetailedFormInputProps;
};

export type DeleteModalProps = {
  id: string;
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};
