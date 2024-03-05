import { useContext, type FunctionComponent } from 'react';
import {
  type ShowModalProps,
  type DeleteModalProps,
} from '../../types/components/modal';
import { type FormComponentProps } from '../../types/components/form';
import { cardGenericProps, cardDetailedProps } from './card-mock';
import { ModalContext } from '../../store/modal-context';

const MockFormComponent: FunctionComponent<FormComponentProps> = () => {
  const { isEditModal } = useContext(ModalContext);

  return (
    <div>
      {isEditModal ? (
        <div>Mock Edit Form Component</div>
      ) : (
        <div>Mock New Form Component</div>
      )}
    </div>
  );
};

export const formModalProps: ShowModalProps = {
  heading: 'Modal Heading',
  form: MockFormComponent,
  show: false,
  catgeoryData: cardGenericProps,
  categoryTypes: [],
  service: cardDetailedProps,
};

export const deleteModalProps: DeleteModalProps = {
  id: '123',
  showDeleteModal: false,
  setShowDeleteModal: () => {},
};
