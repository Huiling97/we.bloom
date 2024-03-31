import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { Button } from 'react-bootstrap';
import { ModalContext } from '../../store/modal-context';
import { CategoriesContext } from '../../store/categories-context';
import { ProductsContext } from '../../store/products-context';
import Shop from '../shop/shop';
import ProductModal from '../../components/modal/product-modal';
import { BackLink } from '../../components/link';

const ManageProducts = () => {
  const { setIsEditModal, setShowModal } = useContext(ModalContext);
  const { categories } = useContext(CategoriesContext);
  const { products, setSelectedProduct } = useContext(ProductsContext);

  const showLoadingOnly = isEmpty(categories) || isEmpty(products);

  const addProductHandler = () => {
    setShowModal(true);
    setIsEditModal(false);
    setSelectedProduct({});
  };

  return (
    <div className='manage-page-container'>
      <BackLink link='/manage' content='Back' />
      {!showLoadingOnly && (
        <div className='buttons-container left'>
          <Button variant='primary' onClick={addProductHandler}>
            Add new product
          </Button>
          <ProductModal />
        </div>
      )}
      <Shop />
    </div>
  );
};

export default ManageProducts;
