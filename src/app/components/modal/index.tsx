import { useContext, type FunctionComponent } from 'react';
import {
  type CardServicesProps,
  type CardGenericProps,
} from '../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context.tsx';

type FormComponentProps = {
  onClose: () => void;
  categories: string[];
  services: CardServicesProps;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};

type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  categories?: string[];
  services?: CardServicesProps;
  show: boolean;
  isEditing: boolean;
  catgeoryData: CardGenericProps;
};

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
            catgeoryData={catgeoryData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
