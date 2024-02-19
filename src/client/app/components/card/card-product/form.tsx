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
import { ProductProps } from '../../../types/components/card/card-product';

const CardProductForm = () => {
  const { setShowModal, isEditModal, isFormCompleted, setIsFormCompleted } =
    useContext(ModalContext);
  const { selectedProduct, addProducts, setProducts } =
    useContext(ProductsContext);

  const [dropdownOption, setDropdownOption] = useState<string>('');

  const { id, name, brand, price, size, details, usage, ingredients } =
    selectedProduct as ProductProps;

  const formInput = {
    id: id,
    name: name || '',
    brand: brand || '',
    category: isEditModal ? dropdownOption : '',
    price: price || '',
    size: size || '',
    details: details || '',
    usage: usage || '',
    ingredients: ingredients || '',
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
    const addProduct = async () => {
      if (isFormCompleted) {
        try {
          const data = { ...formData, category: dropdownOption };

          if (isEditModal) {
            console.log('data', data);
            const response = await axios.put(
              `${URLConstants.PRODUCTS_PATH}/all`,
              data
            );

            setProducts(response.data);
          } else {
            const response = await axios.post(
              `${URLConstants.PRODUCTS_PATH}/all`,
              data
            );
            addProducts(response.data);
          }
        } catch (e) {
          console.log(e);
          if (isEditModal) {
            throw new Error('Error updating product');
          } else {
            throw new Error('Error adding new product');
          }
        }
        setShowModal(false);
        setIsFormCompleted(false);
      }
    };
    addProduct();
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
        <Form.Group as={Col}>
          <Form.Label>Price</Form.Label>
          <InputGroup className='mb-3'>
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
            <Form.Control.Feedback type='invalid'>
              Please provide a price
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Size</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control
              type='text'
              name='size'
              value={formData.size}
              onChange={onChangeHandler}
              className='border-radius-right-none'
            />
            <InputGroup.Text className='border-radius-left-none'>
              ml
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
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

      <Form.Group className='mb-3' controlId='usage'>
        <Form.Label>How to use</Form.Label>
        <Form.Control
          as='textarea'
          name='usage'
          rows={2}
          value={formData.usage}
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
        {isEditModal ? 'Edit' : 'Add'}
      </Button>
    </Form>
  );
};

export default CardProductForm;
