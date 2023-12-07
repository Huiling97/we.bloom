import { useState, type FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropZone from '../../dropzone';

type CardGenericFormProps = {
  onClose: () => void;
};

const CardGenericForm = ({ onClose }: CardGenericFormProps) => {
  const [validated, setValidated] = useState(false);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  const closeHandler = () => {
    if (onClose && validated) {
      onClose();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitFormHandler}>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' required />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='image'>
        <DropZone />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={closeHandler}>
        Add
      </Button>
    </Form>
  );
};

export default CardGenericForm;
