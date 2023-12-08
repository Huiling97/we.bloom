import { useState, type FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropZone from '../../dropzone';

import { ref, set } from 'firebase/database';
import { database } from '../../../../main';

type CardGenericFormProps = {
  onClose: () => void;
};

const CardGenericForm = ({ onClose }: CardGenericFormProps) => {
  const formInput = {
    name: '',
    imageSrc: '',
  };

  const [formData, setFormData] = useState(formInput);
  const [validated, setValidated] = useState(false);

  const onChangeHandler = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onAddHandler = (img: string) => {
    setFormData((prevData) => ({
      ...prevData,
      imageSrc: img,
    }));
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    set(ref(database, 'categories/' + formData.name), {
      imageSrc: formData.imageSrc,
    });
    setValidated(true);
    onClose();
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
        <Form.Control
          type='text'
          name='name'
          value={formData.name}
          required
          onChange={onChangeHandler}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='image'>
        <DropZone onAdd={onAddHandler} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={closeHandler}>
        Add
      </Button>
    </Form>
  );
};

export default CardGenericForm;
