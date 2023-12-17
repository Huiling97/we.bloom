import { useState, useContext, type FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type CardGenericFormProps } from '../../../types/form.ts';
import { ModalContext } from '../../../store/modal-context.tsx';
import { CategoriesContext } from '../../../store/categories-context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropZone from '../../dropzone';

import { ref, set } from 'firebase/database';
import { database } from '../../../../main';

const CardGenericForm = ({ isEditing, catgeoryData }: CardGenericFormProps) => {
  const formInput = {
    id: uuidv4(),
    name: isEditing ? catgeoryData.name : '',
    image: '',
  };

  const categoriesCtx = useContext(CategoriesContext);
  const { setShowModal, isFormCompleted, setIsFormCompleted } =
    useContext(ModalContext);

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
      image: img,
    }));

    if (isEditing) {
      const { id } = catgeoryData;
      categoriesCtx.updateCategory(id, img);
    }
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsFormCompleted(true);
    setValidated(true);
  };

  useEffect(() => {
    const data = {
      id: formData.id,
      name: formData.name,
      image: formData.image,
    };

    if ((formData.name, formData.image)) {
      categoriesCtx.addCategory({ [formData.name]: data });
      set(ref(database, 'categories/' + formData.name), data);
      setShowModal(false);
      setIsFormCompleted(false);
    }
  }, [isFormCompleted]);

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
          disabled={isEditing}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='image'>
        <DropZone onAdd={onAddHandler} />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Add
      </Button>
    </Form>
  );
};

export default CardGenericForm;
