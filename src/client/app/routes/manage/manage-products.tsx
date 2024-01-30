import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ModalContext } from '../../store/modal-context';
import Shop from '../shop';
import ProductModal from '../../components/modal/product-modal';

const ManageProducts = () => {
  const { setIsEditModal, setShowModal } = useContext(ModalContext);

  const addProductHandler = () => {
    setShowModal(true);
    setIsEditModal(false);
  };

  return (
    <div className='manage-page-container'>
      <div className='buttons-container left'>
        <Button variant='primary' onClick={addProductHandler}>
          Add new product
        </Button>
        <ProductModal />
      </div>
      <Shop />
    </div>
  );
};

export default ManageProducts;
