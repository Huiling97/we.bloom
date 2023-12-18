import { type FunctionComponent } from 'react';
import { type ShowModalProps } from '../../types/modal';
import { type FormComponentProps } from '../../types/form';
import { cardGenericProps, cardDetailedProps } from './card-mock';

const MockFormComponent: FunctionComponent<FormComponentProps> = ({
  isEditing,
}) => {
  return (
    <div>
      {isEditing ? (
        <div>Mock Edit Form Component</div>
      ) : (
        <div>Mock New Form Component</div>
      )}
    </div>
  );
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
