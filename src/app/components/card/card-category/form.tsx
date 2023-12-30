import { useState, useContext, type FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type CardGenericFormProps } from '../../../types/form.ts';
import { ModalContext } from '../../../store/modal-context.tsx';
import { CategoriesContext } from '../../../store/categories-context.tsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropZone from '../../dropzone/index.tsx';
import { ref, set } from 'firebase/database';
import { database } from '../../../../main.tsx';

const CardCategoryForm = ({ catgeoryData }: CardGenericFormProps) => {
  const categoriesCtx = useContext(CategoriesContext);
  const { isEditModal, setShowModal, isFormCompleted, setIsFormCompleted } =
    useContext(ModalContext);

  const formInput = {
    id: uuidv4(),
    name: isEditModal ? catgeoryData.name : '',
    image: '',
    description: isEditModal ? catgeoryData.description : '',
  };

  const [formData, setFormData] = useState(formInput);
  const [validated, setValidated] = useState(false);
  const [hasNoImage, setHasNoImage] = useState(true);

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

    if (isEditModal) {
      const { id } = catgeoryData;
      categoriesCtx.updateCategory(id, img);
    }
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false && !hasNoImage) {
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
      description: formData.description,
    };

    if (formData.name && formData.description && formData.image) {
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
          disabled={isEditModal}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type='text'
          name='description'
          value={formData.description}
          required
          onChange={onChangeHandler}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='image'>
        <DropZone onAdd={onAddHandler} setHasNoImage={setHasNoImage} />
        {!hasNoImage && <div className='error'>Please upload an image</div>}
      </Form.Group>
      <div className='buttons-container'>
        <Button variant='primary' type='submit'>
          {isEditModal ? 'Update' : 'Add'}
        </Button>
      </div>
    </Form>
  );
};

export default CardCategoryForm;
