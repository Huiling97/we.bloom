import { useContext, type FunctionComponent } from 'react';
import { type CardServicesProps } from '../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context.tsx';

type FormComponentProps = {
  onClose: () => void;
  categories: string[];
  services: CardServicesProps;
  isEditing: boolean;
  editId: string;
};

type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  categories?: string[];
  services?: CardServicesProps;
  show: boolean;
  isEditing: boolean;
  editId: string;
};

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
  categories,
  services,
  show,
  isEditing,
  editId,
}: ShowModalProps) => {
  const { setShowModal, setIsEditModal } = useContext(ModalContext);

  const handleClose = () => {
    setIsEditModal(false);
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {heading}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent
            onClose={handleClose}
            categories={categories as string[]}
            services={services as CardServicesProps}
            isEditing={isEditing}
            editId={editId}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
