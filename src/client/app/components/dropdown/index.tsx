import { useContext, type ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { ModalContext } from '../../store/modal-context';
import { CategoryTypesContext } from '../../store/category-types-context';
import { displayCategoryOptions } from '../card/card-services/helpers';
import { type DropdownProps } from '../../types/components/dropdown';

const Dropdown = ({
  dropdownOption,
  setDropdownOption,
  isDropdownInvalid,
  setIsDropdownInvalid,
  selectedCategory,
}: DropdownProps) => {
  const { categoryTypes } = useContext(CategoryTypesContext);
  const { isEditModal } = useContext(ModalContext);

  const onDropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setDropdownOption(e.target.value);
    setIsDropdownInvalid(false);
  };

  return (
    <Form.Group controlId='category' className='dropdown-margin-bottom'>
      <Form.Label>Select a category:</Form.Label>
      <Form.Select
        onChange={onDropdownChangeHandler}
        isInvalid={isDropdownInvalid}
        value={isEditModal ? selectedCategory : dropdownOption}
        disabled={isEditModal}
      >
        <option value='' disabled={true}>
          Open this select menu
        </option>
        {displayCategoryOptions(categoryTypes)}
      </Form.Select>
      <Form.Control.Feedback type='invalid'>
        Please select a category
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Dropdown;
