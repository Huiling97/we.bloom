import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
import { ModalContext } from '../../../store/modal-context';

const CardProduct = ({
  products,
  areActionsEnabled,
}: CardProductProps & { areActionsEnabled: boolean }) => {
  const { setShowModal, setIsEditModal } = useContext(ModalContext);
  const { setSelectedProduct, deleteProduct } = useContext(ProductsContext);

  const onEditHandler = (product: ProductProps) => {
    setShowModal(true);
    setIsEditModal(true);
    setSelectedProduct(product);
  };

  const onDeleteHandler = async (productId: number) => {
    try {
      await axios.delete(`${URLConstants.PRODUCTS_PATH}/${productId}`);
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
              <Link
                to={`/shop/${productId}`}
                className='link-no-decoration link-grey'
              >
                <Card.Img variant='top' src='image4.jpg' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                </Card.Body>
              </Link>

              {areActionsEnabled && (
                <Card.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => onEditHandler(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => onDeleteHandler(productId)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
