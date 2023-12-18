import { type FunctionComponent } from 'react';
import { type ShowModalProps } from '../../types/modal';
import { type FormComponentProps } from '../../types/form';
import { cardGenericProps, cardDetailedProps } from './card-mock';

const MockFormComponent: FunctionComponent<FormComponentProps> = () => {
  return <div>Mock Form Component</div>;
};

export const modalProps: ShowModalProps = {
  heading: 'Modal Heading',
  form: MockFormComponent,
  show: false,
  isEditing: false,
  catgeoryData: cardGenericProps,
  categories: [],
  service: cardDetailedProps,
};
