import { useContext } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {
  type ProductProps,
  type CardProductProps,
} from '../../../types/components/card/card-product';
import URLConstants from '../../../util/constants/url-constants';
import { ProductsContext } from '../../../store/products-context';

const CardProduct = ({
  products,
  areActionsEnabled,
}: CardProductProps & { areActionsEnabled: boolean }) => {
  const { deleteProduct } = useContext(ProductsContext);

  const onDeleteHandler = async (productId: number) => {
    try {
      await axios.delete(`${URLConstants.PRODUCTS_PATH}/all/${productId}`);
      deleteProduct(productId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Row xs={1} md={4} className='card-product-container'>
      {products.map((product: ProductProps) => {
        const productId = product.id;

        return (
          <Col key={productId}>
            <Card>
              <Card.Img variant='top' src='image4.jpg' />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.brand}</Card.Text>
                {areActionsEnabled && (
                  <Button
                    variant='danger'
                    onClick={() => onDeleteHandler(productId)}
                  >
                    Delete
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
