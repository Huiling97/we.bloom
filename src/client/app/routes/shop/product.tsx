import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { ChevronBack } from 'styled-icons/ionicons-solid';
import URLConstants from '../../util/constants/url-constants';
import { ProductsContext } from '../../store/products-context';
import { ProductProps } from '../../types/components/card/card-product';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    if (id) {
      if (!isEmpty(products)) {
        const foundProduct = products.find((product) =>
          id ? product.id === parseInt(id) : null
        );

        if (!foundProduct) {
          navigate('/error');
        } else {
          setSelectedProduct(foundProduct);
        }
      } else {
        const fetchSelectedProduct = async () => {
          try {
            const response = await axios.get(
              `${URLConstants.PRODUCTS_PATH}/${id}`
            );
            setSelectedProduct(response.data);
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
    <div className='product-content-container'>
      <Link to={'/shop'} className='back-button link-no-decoration'>
        <ChevronBack size='28' className='back-button-icon' />
        <div>Back to all products</div>
      </Link>
      <div className='product-container-main'>
        <div className='image-container'>
          <img
            src='/image4.jpg'
            alt='product image'
            className='product-image'
          />
        </div>
        <div className='product-details-container'>
          <div className='font-bold'>{selectedProduct?.brand}</div>
          <div className='product-name'>{selectedProduct?.name}</div>
          <div>${selectedProduct?.price}</div>
          <div className='font-bold'>Description</div>
          <div>{selectedProduct?.details}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
