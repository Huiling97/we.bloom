import { useState, useContext, type FormEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { type AuthFormProps } from '../../types/components/form.ts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ModalContext } from '../../store/modal-context.tsx';
import { checkCredentials } from '../../util/auth-helper.ts';
import { getCategoryById } from '../../util/category-helper.ts';
import AlertDismissible from '../alert/index.tsx';
import { ref, set } from 'firebase/database';
import { database } from '../../../main.tsx';

const AuthForm: React.FC<AuthFormProps> = ({ formId }: AuthFormProps) => {
  const categoriesCtx = useContext(CategoriesContext);
  const modalCtx = useContext(ModalContext);

  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });

  const onChangeHandler = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setIsFormCompleted(true);
    }
  };

  useEffect(() => {
    const { username, password } = formInput;

    if (isFormCompleted) {
      if (checkCredentials(username, password)) {
        setIsValidCredentials(true);
        setValidated(false);

        if (categoriesCtx.categories) {
          const selectedCategory = getCategoryById(
            categoriesCtx.categories,
            formId
          );
          if (selectedCategory) {
            const { name } = selectedCategory;
            categoriesCtx.deleteCategory(formId);
            set(ref(database, 'categories/' + name), null);
            set(ref(database, 'services/' + name), null);
            modalCtx.setIsAuthModal(false);
          }
        }
      } else {
        setShowError(true);
        setIsFormCompleted(false);
      }
    }
  }, [isFormCompleted]);

  return (
    <div>
      {showError && (
        <AlertDismissible
          text='Invalid username or password'
          showAlert={showError}
        />
      )}
      <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            required
            placeholder='Enter username'
            onChange={onChangeHandler}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter your username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            required
            placeholder='Password'
            onChange={onChangeHandler}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div>{isValidCredentials && <NavLink to='/manage' />}</div>
    </div>
  );
};

export default AuthForm;
