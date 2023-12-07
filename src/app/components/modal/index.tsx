import { useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type FormComponentProps = {
  onClose: () => void;
};

type ShowModalProps = {
  heading: string;
  form: FunctionComponent<FormComponentProps>;
};

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
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
          <FormComponent onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
