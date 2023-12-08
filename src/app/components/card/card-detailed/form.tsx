import { useState, type FormEvent, ReactNode, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropZone from '../../dropzone';

import { ref, set } from 'firebase/database';
import { database } from '../../../../main';

type CardDetailedFormProps = {
  onClose: () => void;
  categories: string[];
};

const CardDetailedForm = ({ onClose, categories }: CardDetailedFormProps) => {
  const formInput = {
    category: '',
    name: '',
    description: '',
    imageSrc: '',
  };

  const [formData, setFormData] = useState(formInput);
  const [dropdownOption, setDropdownOption] = useState('');
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);

  const onDropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setDropdownOption(e.target.value);
    setIsDropdownInvalid(false);
  };

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

    if (!dropdownOption) {
      setIsDropdownInvalid(true);
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const { name, description, imageSrc } = formData;
    set(ref(database, 'service/' + formData.name), {
      category: dropdownOption,
      name,
      description,
      imageSrc,
    });
    setValidated(true);
    onClose();
  };

  const closeHandler = () => {
    if (onClose && validated) {
      onClose();
    }
  };

  const displayCategoryOptions = (categories: string[]): ReactNode => {
    return categories.map((category) => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitFormHandler}>
      <Form.Group controlId='category'>
        <Form.Label>Select a category:</Form.Label>
        <Form.Select
          onChange={onDropdownChangeHandler}
          value={dropdownOption}
          isInvalid={isDropdownInvalid}
        >
          <option value='' disabled={true}>
            Open this select menu
          </option>
          {displayCategoryOptions(categories)}
        </Form.Select>
      </Form.Group>
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
        <DropZone onAdd={onAddHandler} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={closeHandler}>
        Add
      </Button>
    </Form>
  );
};

export default CardDetailedForm;
