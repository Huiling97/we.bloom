import { useContext, type FunctionComponent } from 'react';
import {
  type CardServicesProps,
  type CardGenericProps,
} from '../../types/card.ts';
import { type ShowModalProps } from '../../types/modal.ts';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context.tsx';

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
  categories,
  services,
  show,
  isEditing,
  catgeoryData,
}: ShowModalProps) => {
  const { setShowModal, setIsEditModal } = useContext(ModalContext);

  const handleClose = () => {
    setIsEditModal(false);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent
            categories={categories as string[]}
            services={services as CardServicesProps}
            isEditing={isEditing}
            catgeoryData={catgeoryData as CardGenericProps}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
