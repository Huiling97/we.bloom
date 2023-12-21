import { Dispatch, type FunctionComponent, type SetStateAction } from 'react';
import {
  type CardDetailedFormInputProps,
  type CardGenericProps,
} from './card.ts';
import { FormComponentProps } from './form.ts';

export type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  formId?: string;
  show: boolean;
  isEditing: boolean;
  catgeoryData?: CardGenericProps;
  categories?: string[];
  service?: CardDetailedFormInputProps;
};

export type DeleteModalProps = {
  id: string;
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};
