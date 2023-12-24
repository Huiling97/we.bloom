import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { type CardGenericObjectProps } from '../../types/card';
import { type DeleteModalProps } from '../../types/modal.ts';
import { CategoriesContext } from '../../store/categories-context';
import { ref, set } from 'firebase/database';
import { database } from '../../../main.tsx';

const DeleteModal = ({
  id,
  showDeleteModal,
  setShowDeleteModal,
}: DeleteModalProps) => {
  const categoriesCtx = useContext(CategoriesContext);

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const getCategoryById = (categories: CardGenericObjectProps, id: string) => {
    return Object.values(categories).find((category) => category.id === id);
  };

  const onDeleteCategoryHandler = () => {
    if (categoriesCtx.categories) {
      const selectedCategory = getCategoryById(categoriesCtx.categories, id);
      if (selectedCategory) {
        const { name } = selectedCategory;
        categoriesCtx.deleteCategory(id);
        set(ref(database, 'categories/' + name), null);
        set(ref(database, 'services/' + name), null);
        setShowDeleteModal(false);
      }
    }
  };

  return (
    <>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will delete all the services listed under the category as well.
          Would you like to proceed to delete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={onDeleteCategoryHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
