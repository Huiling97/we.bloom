import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Button from 'react-bootstrap/Button';
import URLConstants from '../../util/constants/url-constants';
import { ModalContext } from '../../store/modal-context';
import { ProductsContext } from '../../store/products-context';
import { ProductProps } from '../../types/components/card/card-product';
import { isManageStorePage } from '../../util/path-helper';
import ProductModal from '../../components/modal/product-modal';
import { BackLink } from '../../components/link';

const Product = ({ areActionsEnabled }: { areActionsEnabled: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setShowModal, isEditModal, setIsEditModal } =
    useContext(ModalContext);
  const { products, setSelectedProduct, deleteProduct } =
    useContext(ProductsContext);
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );

  const productId = parseInt(id!);

  const redirectionUrl = () =>
    isManageStorePage() ? '/manage/products' : '/shop';

  const onEditHandler = (product: ProductProps) => {
    setShowModal(true);
    setIsEditModal(true);
    setSelectedProduct(product);
  };

  const onDeleteHandler = async (productId: number) => {
    try {
      await axios.delete(`${URLConstants.PRODUCTS_PATH}/${productId}`);
      deleteProduct(productId);
      navigate('/manage/products');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      if (!isEmpty(products)) {
        const foundProduct = products.find((product) =>
          id ? product.id === productId : null
        );

        if (!foundProduct) {
          navigate('/error');
        } else {
          setProductDetails(foundProduct);
        }
      } else {
        const fetchSelectedProduct = async () => {
          try {
            const response = await axios.get(
              `${URLConstants.PRODUCTS_PATH}/${id}`
            );
            setProductDetails(response.data);
          } catch (e) {
            console.error('Error fetching product', e);
            navigate('/error');
          }
        };

        fetchSelectedProduct();
      }
    }
  }, [products, id]);

  return (
    <div className='product-container'>
      <div className='product-actions-container'>
        {isEditModal && <ProductModal />}
        <BackLink link={redirectionUrl()} content='Back to all products' />
        {areActionsEnabled && (
          <div className='buttons-container'>
            <Button
              variant='secondary'
              onClick={() => onEditHandler(productDetails!)}
            >
              Edit
            </Button>
            <Button variant='danger' onClick={() => onDeleteHandler(productId)}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className='product-content-container'>
        <div className='image-container'>
          <img
            src='/image4.jpg'
            alt='product image'
            className='product-image'
          />
        </div>
        <div className='product-details-container'>
          <div className='font-bold'>{productDetails?.brand}</div>
          <div className='product-name'>{productDetails?.name}</div>
          <div>${productDetails?.price}</div>
          <div className='font-bold'>Description</div>
          <div>{productDetails?.details}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
