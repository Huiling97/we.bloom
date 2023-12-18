import {
  useState,
  type FormEvent,
  type ReactNode,
  type ChangeEvent,
  useEffect,
  useContext,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  type CardDetailedFormInputProps,
  type CardDetailsProps,
} from '../../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ref, set } from 'firebase/database';
import { database } from '../../../../main';
import ServiceDetailsForm from './details/form';
import { displayCategoryOptions } from './helpers.tsx';
import { ModalContext } from '../../../store/modal-context.tsx';
import { ServicesContext } from '../../../store/services-context.tsx';

type CardDetailedFormProps = {
  categories: string[];
  service: CardDetailedFormInputProps;
};

const CardDetailedForm = ({ categories, service }: CardDetailedFormProps) => {
  const {
    setShowModal,
    isEditModal,
    setIsEditModal,
    isFormCompleted,
    setIsFormCompleted,
  } = useContext(ModalContext);
  const { services, setServices, updateService } = useContext(ServicesContext);

  const formInput = {
    id: uuidv4(),
    category: isEditModal ? service.category : '',
    name: isEditModal ? service.name : '',
    description: isEditModal ? service.description : '',
    details: isEditModal ? service.details : [],
  };

  const [formData, setFormData] = useState(
    formInput as CardDetailedFormInputProps
  );
  const [detailsData, setDetailsData] = useState({});
  const [allDetailsData, setAllDetailsData] = useState<CardDetailsProps[]>([]);
  const [dropdownOption, setDropdownOption] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);

  const onDetailsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const detail = {
      [name]: value,
    };
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
    setAllDetailsData((prevValue) => [
      ...prevValue,
      detailsData as CardDetailsProps,
    ]);
    setIsFormCompleted(false);
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

    setAllDetailsData((prevValue) => [
      ...prevValue,
      detailsData as CardDetailsProps,
    ]);
    setServices(services);

    setIsFormCompleted(true);
    setValidated(true);
  };

  const { id, name, description } = formData;

  useEffect(() => {
    let updatedData;
    const data = {
      id,
      category: dropdownOption,
      name,
      description,
      details: allDetailsData,
    };

    if (dropdownOption && name && description) {
      if (isEditModal) {
        const selectedCategory = services[dropdownOption];
        const serviceIndex = selectedCategory.findIndex(
          (s) => s.id === service.id
        );

        updateService(service, data);
        set(
          ref(database, 'services/' + dropdownOption + `/${serviceIndex}`),
          data
        );
      } else {
        if (services[dropdownOption] && services[dropdownOption].length !== 0) {
          const existingData = services[dropdownOption];
          updatedData = [...existingData, data];
        } else {
          updatedData = [data];
        }
        set(ref(database, 'services/' + dropdownOption), updatedData);
      }
      setShowModal(false);
      setIsFormCompleted(false);
      setIsEditModal(false);
    }
  }, [isFormCompleted]);

  console.log('services', services);

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
      <Button variant='primary' type='submit'>
        Add
      </Button>
    </Form>
  );
};

export default CardDetailedForm;
