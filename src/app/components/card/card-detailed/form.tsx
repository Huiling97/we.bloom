import {
  useState,
  type FormEvent,
  type ReactNode,
  type ChangeEvent,
  useEffect,
} from 'react';
import {
  type CardDetailedFormInputProps,
  type CardDetailsProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ref, set } from 'firebase/database';
import { database } from '../../../../main';
import ServiceDetailsForm from './details/form';

type CardDetailedFormProps = {
  onClose: () => void;
  categories: string[];
  services: CardServicesProps;
};

const CardDetailedForm = ({
  onClose,
  categories,
  services,
}: CardDetailedFormProps) => {
  const formInput = {
    category: '',
    name: '',
    description: '',
    details: [],
  };

  const [formData, setFormData] = useState(
    formInput as CardDetailedFormInputProps
  );
  const [detailsData, setDetailsData] = useState({});
  const [allDetailsData, setAllDetailsData] = useState<
    CardDetailsProps[] | {}[]
  >([]);
  const [dropdownOption, setDropdownOption] = useState<string>('');

  const [completed, setCompleted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);

  const onDetailsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const detail = {
      [name]: value,
    };
    setCompleted(true);
    setDetailsData((prevValue) => ({ ...prevValue, ...detail }));
  };

  const [additionalDetailsForm, setAdditionalDetailsForm] = useState<
    ReactNode[]
  >([<ServiceDetailsForm onDetailsChange={onDetailsChangeHandler} />]);

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

  const addDetailsHandler = () => {
    setAdditionalDetailsForm([
      ...additionalDetailsForm,
      <ServiceDetailsForm onDetailsChange={onDetailsChangeHandler} />,
    ]);
    setAllDetailsData((prevValue) => [...prevValue, detailsData]);
    setCompleted(false);
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (!dropdownOption) {
      setIsDropdownInvalid(true);
      return;
    }
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setAllDetailsData((prevValue) => [...prevValue, detailsData]);

    setCompleted(true);
    setValidated(true);
    onClose();
  };

  const closeHandler = () => {
    if (onClose && validated) {
      onClose();
    }
  };

  const { name, description } = formData;

  useEffect(() => {
    let updatedData;
    const data = {
      category: dropdownOption,
      name,
      description,
      details: allDetailsData,
    };

    if (dropdownOption && name && description && completed) {
      if (services[dropdownOption] && services[dropdownOption].length !== 0) {
        const existingData = services[dropdownOption];
        updatedData = [...existingData, data];
      } else {
        updatedData = [data];
      }
      set(ref(database, 'services/' + dropdownOption), updatedData);
    }
  }, [dropdownOption, name, description, allDetailsData]);

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
          Please provide a description
        </Form.Control.Feedback>
      </Form.Group>
      <div>
        {additionalDetailsForm.map((form, index) => (
          <div key={index}>{form}</div>
        ))}
      </div>
      <Button variant='primary' onClick={addDetailsHandler}>
        Add additional price and duration
      </Button>
      <Button variant='primary' type='submit' onClick={closeHandler}>
        Add
      </Button>
    </Form>
  );
};

export default CardDetailedForm;
