import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';
import URLConstants from '../../util/constants/url-constants';
import { ProductsContext } from '../../store/products-context';
import { ProductProps } from '../../types/components/card/card-product';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | {}>({});

  console.log('prod', products);

  useEffect(() => {
    if (id) {
      if (!isEmpty(products)) {
        const foundProduct = products.find((product) =>
          id ? product.id === parseInt(id) : {}
        );
        console.log('found', foundProduct);
        if (!foundProduct) {
          navigate('/error');
        } else {
          setSelectedProduct(foundProduct);
        }
      } else {
        try {
          const fetchSelectedProduct = async () => {
            const response = await axios.get(
              `${URLConstants.PRODUCTS_PATH}/${id}`
            );
            console.log('resp.data', response.data);
            setSelectedProduct(response.data);
          };

          fetchSelectedProduct();
        } catch (e) {
          console.error('Error fetching product', e);
        }
      }
    }
  }, [products, id]);

  // console.log('sele', selectedProduct);

  return (
    <div className='product-container-main'>
      <img src='/image4.jpg' alt='product image' className='product-image' />
      <div className='product-details-container'>
        <div className='font-bold'>{selectedProduct?.brand}</div>
        <div className='product-title'>{selectedProduct?.name}</div>
        <div>${selectedProduct?.price}</div>

        <div>Description</div>
        <div>{selectedProduct?.details}</div>
      </div>
    </div>
  );
};

export default Product;
