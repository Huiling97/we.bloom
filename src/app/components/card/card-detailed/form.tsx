import {
  useState,
  type FormEvent,
  type ReactNode,
  type ChangeEvent,
  useEffect,
  useContext,
} from 'react';
import {
  type CardDetailedFormInputProps,
  type CardDetailsProps,
} from '../../../types/card.ts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ServiceDetailsForm from './details/form.tsx';
import { displayCategoryOptions } from './helpers.tsx';
import { ModalContext } from '../../../store/modal-context.tsx';
import { ServicesContext } from '../../../store/services-context.tsx';
import { DetailsContext } from '../../../store/details-context.tsx';
import { ref, set } from 'firebase/database';
import { database } from '../../../../main';

type CardDetailedFormProps = {
  formId: string;
  categories: string[];
  service: CardDetailedFormInputProps;
};

const CardDetailedForm = ({
  formId,
  categories,
  service,
}: CardDetailedFormProps) => {
  const {
    setShowModal,
    isEditModal,
    setIsEditModal,
    isFormCompleted,
    setIsFormCompleted,
  } = useContext(ModalContext);
  const { services, setServices, updateService } = useContext(ServicesContext);
  const { details, addDetails } = useContext(DetailsContext);

  const formInput = {
    id: formId,
    category: isEditModal ? service.category : '',
    name: isEditModal ? service.name : '',
    description: isEditModal ? service.description : '',
    details: isEditModal ? service.details : [],
  };

  const [formData, setFormData] = useState(
    formInput as CardDetailedFormInputProps
  );
  const [detailsData, setDetailsData] = useState({});
  const [additionalDetailsForm, setAdditionalDetailsForm] = useState<
    ReactNode[]
  >([]);

  const [dropdownOption, setDropdownOption] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);
  const [isEditingCompleted, setIsEditingCompleted] = useState(false);

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

  const onDetailsChangeHandler = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    const updatedData = {
      [name]: value,
    };

    setDetailsData((prevValue) => ({ ...prevValue, ...updatedData }));
  };

  const addDetailsHandler = () => {
    setAdditionalDetailsForm([
      ...additionalDetailsForm,
      <ServiceDetailsForm
        id={formInput.id}
        onDetailsChange={onDetailsChangeHandler}
      />,
    ]);

    addDetails(formInput.id, detailsData as CardDetailsProps);

    setDetailsData({});
    setIsFormCompleted(false);
  };

  useEffect(() => {
    if (isEditModal) {
      const { details } = service;

      const formsToAdd = details.map((d) => {
        return (
          <ServiceDetailsForm
            id={formInput.id}
            data={d}
            onDetailsChange={onDetailsChangeHandler}
          />
        );
      });
      setAdditionalDetailsForm((prevForm) => [...prevForm, ...formsToAdd]);
    } else {
      setAdditionalDetailsForm([
        ...additionalDetailsForm,
        <ServiceDetailsForm
          id={formInput.id}
          onDetailsChange={onDetailsChangeHandler}
        />,
      ]);
    }
  }, [isEditModal]);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (isEditModal) {
      setIsDropdownInvalid(false);
    } else {
      if (!dropdownOption) {
        setIsDropdownInvalid(true);
        return;
      }
    }
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    addDetails(formInput.id, detailsData as CardDetailsProps);
    setServices(services);

    setDetailsData({});
    setIsFormCompleted(true);
    setValidated(true);
    if (isEditModal) setIsEditingCompleted(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsFormCompleted(false);
    setIsEditModal(false);
  };

  useEffect(() => {
    const { id, name, description } = formData;
    let updatedData;
    const data = {
      id,
      category: isEditModal ? service.category : dropdownOption,
      name,
      description,
      details: details[id],
    };

    if (isEditModal) {
      if (name && description && isEditingCompleted) {
        const selectedCategory = services[service.category];
        const serviceIndex = selectedCategory.findIndex(
          (s) => s.id === service.id
        );
        if (serviceIndex !== -1) {
          updateService(service, data);
          set(
            ref(database, 'services/' + service.category + `/${serviceIndex}`),
            data
          );
        }
        closeModal();
      }
    } else {
      if (dropdownOption && name && description) {
        if (services[dropdownOption] && services[dropdownOption].length !== 0) {
          const existingData = services[dropdownOption];
          updatedData = [...existingData, data];
        } else {
          updatedData = [data];
        }
        set(ref(database, 'services/' + dropdownOption), updatedData);
        closeModal();
      }
    }
  }, [isFormCompleted]);

  return (
    <Form noValidate validated={validated} onSubmit={submitFormHandler}>
      <Form.Group controlId='category'>
        <Form.Label>Select a category:</Form.Label>
        <Form.Select
          onChange={onDropdownChangeHandler}
          value={isEditModal ? service.category : dropdownOption}
          isInvalid={isDropdownInvalid}
          disabled={isEditModal}
        >
          <option value='' disabled={true}>
            Open this select menu
          </option>
          {displayCategoryOptions(categories)}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>
          Please select a category
        </Form.Control.Feedback>
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
