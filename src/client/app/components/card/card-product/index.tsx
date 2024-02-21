import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  type ProductProps,
  type CardProductProps,
} from '../../../types/components/card/card-product';
import { isManageStorePage } from '../../../util/path-helper';

const CardProduct = ({ products }: CardProductProps) => {
  const redirectionUrl = (productId: number) =>
    isManageStorePage()
      ? `/manage/products/${productId}`
      : `/shop/${productId}`;

  return (
    <Row xs={1} md={4} className='card-product-container'>
      {products.map((product: ProductProps) => {
        const productId = product.id;

        return (
          <Col key={productId}>
            <Card>
              <Link
                to={redirectionUrl(productId)}
                className='link-no-decoration link-grey'
              >
                <Card.Img variant='top' src='image4.jpg' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
