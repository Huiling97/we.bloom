import { useContext, type FunctionComponent } from 'react';
import {
  type CardDetailedFormInputProps,
  type CardGenericProps,
} from '../../types/card.ts';
import { type ShowModalProps } from '../../types/modal.ts';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context.tsx';
import { DetailsContext } from '../../store/details-context.tsx';

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
  formId,
  show,
  catgeoryData,
  categories,
  service,
}: ShowModalProps) => {
  const { setShowModal, setIsEditModal } = useContext(ModalContext);
  const { setDetails } = useContext(DetailsContext);

  const handleClose = () => {
    setIsEditModal(false);
    setShowModal(false);
    setDetails([]);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        role='modal'
        contentClassName='modal-content-container'
      >
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent
            formId={formId as string}
            categories={categories as string[]}
            service={service as CardDetailedFormInputProps}
            catgeoryData={catgeoryData as CardGenericProps}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
