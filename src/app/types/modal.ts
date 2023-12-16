import { type FunctionComponent } from 'react';
import { type CardServicesProps, type CardGenericProps } from './card.ts';
import { FormComponentProps } from './form.ts';

export type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  categories?: string[];
  services?: CardServicesProps;
  show: boolean;
  isEditing: boolean;
  catgeoryData?: CardGenericProps;
};
