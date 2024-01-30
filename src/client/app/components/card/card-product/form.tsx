import { useState, useContext, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from '../../dropdown';
import { ModalContext } from '../../../store/modal-context';
import { ProductsContext } from '../../../store/products-context';
import URLConstants from '../../../util/constants/url-constants';

const CardProductForm = () => {
  const { setShowModal, isEditModal, isFormCompleted, setIsFormCompleted } =
    useContext(ModalContext);
  const { addProducts } = useContext(ProductsContext);

  const [dropdownOption, setDropdownOption] = useState<string>('');

  const formInput = {
    name: '',
    brand: '',
    category: isEditModal ? dropdownOption : '',
    price: '',
    size: '',
    details: '',
    how_to_use: '',
    ingredients: '',
  };

  const [formData, setFormData] = useState(formInput);
  const [validated, setValidated] = useState(false);
  const [isDropdownInvalid, setIsDropdownInvalid] = useState(false);

  const onChangeHandler = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      e.stopPropagation();

      if (!dropdownOption) {
        setIsDropdownInvalid(true);
        return;
      }
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }
    }

    setIsFormCompleted(true);
    setValidated(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (isFormCompleted) {
        try {
          const data = { ...formData, category: dropdownOption };

          const response = await axios.post(
            `${URLConstants.PRODUCTS_PATH}/all`,
            data
          );

          addProducts(response.data);
        } catch (e) {
          console.log(e);
          throw new Error('Error adding new product');
        }
        setShowModal(false);
        setIsFormCompleted(false);
      }
    };
    fetchProducts();
  }, [isFormCompleted]);

  return (
    <Form noValidate validated={validated} onSubmit={submitFormHandler}>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          required
          value={formData.name}
          onChange={onChangeHandler}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='brand'>
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type='text'
          name='brand'
          required
          value={formData.brand}
          onChange={onChangeHandler}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a brand
        </Form.Control.Feedback>
      </Form.Group>

      <Dropdown
        dropdownOption={dropdownOption}
        setDropdownOption={setDropdownOption}
        isDropdownInvalid={isDropdownInvalid}
        setIsDropdownInvalid={setIsDropdownInvalid}
      />

      <Row className='mb-3'>
        <InputGroup as={Col}>
          <Form.Label>Price</Form.Label>
          <div className='add-on-container'>
            <InputGroup.Text className='border-radius-right-none'>
              $
            </InputGroup.Text>
            <Form.Control
              type='number'
              name='price'
              required
              value={formData.price}
              onChange={onChangeHandler}
              className='border-radius-left-none'
            />
          </div>
          <Form.Control.Feedback type='invalid'>
            Please provide a price
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup as={Col}>
          <Form.Label>Size</Form.Label>
          <div className='add-on-container'>
            <Form.Control
              type='number'
              name='size'
              value={formData.size}
              onChange={onChangeHandler}
              className='border-radius-right-none'
            />
            <InputGroup.Text className='border-radius-left-none'>
              ml
            </InputGroup.Text>
          </div>
        </InputGroup>
      </Row>
      <Form.Group className='mb-3' controlId='details'>
        <Form.Label>Details</Form.Label>
        <Form.Control
          as='textarea'
          name='details'
          rows={2}
          value={formData.details}
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='how_to_use'>
        <Form.Label>How to use</Form.Label>
        <Form.Control
          as='textarea'
          name='how_to_use'
          rows={2}
          value={formData.how_to_use}
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='ingredients'>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as='textarea'
          name='ingredients'
          rows={2}
          value={formData.ingredients}
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Button variant='secondary' onClick={closeModalHandler}>
        Close
      </Button>
      <Button variant='primary' type='submit'>
        Add
      </Button>
    </Form>
  );
};

export default CardProductForm;
