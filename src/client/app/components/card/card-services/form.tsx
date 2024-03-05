import {
  useState,
  type FormEvent,
  type ReactElement,
  type ChangeEvent,
  useEffect,
  useContext,
} from 'react';
import { type CardDetailsProps } from '../../../types/components/card/card-service-details.ts';
import {
  type CardServiceFormProps,
  type CardServiceFormInputProps,
} from '../../../types/components/form.ts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ServiceDetailsForm from './details/form.tsx';
import Dropdown from '../../dropdown/index.tsx';
import { ModalContext } from '../../../store/modal-context.tsx';
import { CategoriesContext } from '../../../store/categories-context.tsx';
import { ServicesContext } from '../../../store/services-context.tsx';
import { DetailsContext } from '../../../store/details-context.tsx';
import { ref, set, update } from 'firebase/database';
import { database } from '../../../../main.tsx';

const CardServiceForm = ({ formId, service }: CardServiceFormProps) => {
  const {
    setShowModal,
    isEditModal,
    setIsEditModal,
    isFormCompleted,
    setIsFormCompleted,
  } = useContext(ModalContext);
  const { categories } = useContext(CategoriesContext);
  const { services, setServices, updateService } = useContext(ServicesContext);
  const { details, setDetails, addDetails, deleteDetails } =
    useContext(DetailsContext);

  const defaultDetails = {
    index: 0,
    duration: '',
    price: '',
  };
  const formInput = {
    id: formId,
    category: isEditModal ? service.category : '',
    name: isEditModal ? service.name : '',
    description: isEditModal ? service.description : '',
    details: isEditModal ? details : [],
  };

  const [formData, setFormData] = useState(
    formInput as CardServiceFormInputProps
  );
  const [detailsData, setDetailsData] = useState(defaultDetails);
  const [additionalDetailsForm, setAdditionalDetailsForm] = useState<
    ReactElement[]
  >([]);

  const [dropdownOption, setDropdownOption] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);
  const [isEditingCompleted, setIsEditingCompleted] = useState(false);
  const [enableAddDetailsBtn, setEnableAddDetailsBtn] = useState(false);

  const onTextChangeHandler = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onDetailsChangeHandler = (
    detailIndex: number,
    e: ChangeEvent<HTMLInputElement>,
    input?: CardDetailsProps
  ) => {
    const { value, name } = e.target;
    const updatedData = {
      index: detailIndex,
      [name]: value,
    };

    if (isEditModal && input?.duration && input?.price) {
      setDetailsData({ ...input, ...updatedData });
    } else {
      setDetailsData((prevValue) => ({ ...prevValue, ...updatedData }));
    }
  };

  const onDetailsDeleteHandler = (index: number) => {
    setAdditionalDetailsForm((prevForm) => {
      return prevForm.filter((form) => form.props.index !== index);
    });

    setEnableAddDetailsBtn(true);
    deleteDetails(index);
  };

  const addDetailsHandler = () => {
    const formIndex = additionalDetailsForm.length;
    setAdditionalDetailsForm([
      ...additionalDetailsForm,
      <ServiceDetailsForm
        key={formInput.id}
        id={formInput.id}
        index={formIndex}
        data={defaultDetails}
        onDetailsChange={onDetailsChangeHandler}
        onDetailsDelete={onDetailsDeleteHandler}
      />,
    ]);

    const detailsIndex = details.length;
    addDetails({ index: detailsIndex, duration: '', price: '' });
    setDetailsData(defaultDetails);
    setIsFormCompleted(false);
  };

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

    setServices(services);
    setDetailsData(defaultDetails);

    setIsFormCompleted(true);
    setValidated(true);
    if (isEditModal) setIsEditingCompleted(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsFormCompleted(false);
    setIsEditModal(false);
    setDetails([]);
  };

  useEffect(() => {
    if (detailsData.duration && detailsData.price) {
      if (isEditModal) {
        addDetails(detailsData as CardDetailsProps);
        setDetailsData(detailsData);
      } else {
        addDetails(detailsData as CardDetailsProps);
      }
      setEnableAddDetailsBtn(true);
    } else {
      setEnableAddDetailsBtn(false);
    }
  }, [detailsData]);

  useEffect(() => {
    let formsToAdd: ReactElement[] = [];
    if (details.length === 0) {
      formsToAdd = [
        <ServiceDetailsForm
          key={formInput.id}
          id={formInput.id}
          index={0}
          onDetailsChange={onDetailsChangeHandler}
          onDetailsDelete={onDetailsDeleteHandler}
        />,
      ];
    } else {
      formsToAdd = details.map((detailData) => {
        return (
          <ServiceDetailsForm
            key={formInput.id}
            id={formInput.id}
            index={detailData.index}
            data={detailData}
            onDetailsChange={onDetailsChangeHandler}
            onDetailsDelete={onDetailsDeleteHandler}
          />
        );
      });
      setEnableAddDetailsBtn(true);
    }
    setAdditionalDetailsForm((prevForm) => [...prevForm, ...formsToAdd]);
  }, [isEditModal]);

  useEffect(() => {
    const { id, name, description } = formData;
    let updatedData;
    const data = {
      id,
      category: isEditModal ? service.category : dropdownOption,
      name,
      description,
      details: details,
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

        const updateServicesCount =
          categories[dropdownOption].servicesCount! + 1;

        set(ref(database, 'services/' + dropdownOption), updatedData);
        update(ref(database, 'categories/' + dropdownOption), {
          servicesCount: updateServicesCount,
        });
        closeModal();
      }
    }
  }, [isFormCompleted]);

  return (
    <Form noValidate validated={validated} onSubmit={submitFormHandler}>
      <div className='form-container'>
        <Dropdown
          dropdownOption={dropdownOption}
          setDropdownOption={setDropdownOption}
          isDropdownInvalid={isDropdownInvalid}
          setIsDropdownInvalid={setIsDropdownInvalid}
          selectedCategory={service.category}
        />
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={formData.name}
            required
            onChange={onTextChangeHandler}
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
            onChange={onTextChangeHandler}
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a description
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className='additional-details-container'>
        {additionalDetailsForm &&
          additionalDetailsForm.map((form, index) => (
            <div key={index}>{form}</div>
          ))}
      </div>
      <div className='buttons-container'>
        <Button
          variant='outline-primary'
          disabled={!enableAddDetailsBtn}
          onClick={addDetailsHandler}
        >
          Add additional price and duration
        </Button>
        <Button variant='primary' type='submit'>
          {isEditModal ? 'Update' : 'Add'}
        </Button>
      </div>
    </Form>
  );
};

export default CardServiceForm;
