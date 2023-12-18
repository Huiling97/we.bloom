import { type FunctionComponent } from 'react';
import {
  type CardDetailedFormInputProps,
  type CardGenericProps,
} from './card.ts';
import { FormComponentProps } from './form.ts';

export type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  show: boolean;
  isEditing: boolean;
  catgeoryData?: CardGenericProps;
  categories?: string[];
  service?: CardDetailedFormInputProps;
};
