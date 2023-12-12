import { useState, type FunctionComponent } from 'react';
import { CardDetailedFormInputProps } from '../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type FormComponentProps = {
  onClose: () => void;
  categories: string[];
  services: CardDetailedFormInputProps[];
};

type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
  categories?: string[];
  services?: CardDetailedFormInputProps[];
};

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
  categories,
  services,
}: ShowModalProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            services={services as CardDetailedFormInputProps[]}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
