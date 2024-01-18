import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  type ProductProps,
  type CardProductProps,
} from '../../../types/card/card-product';

const CardProduct = ({ products }: CardProductProps) => {
  return (
    <Row xs={1} md={4} className='card-product-container'>
      {products.map((product: ProductProps) => {
        return (
          <Col key={product.id}>
            <Card>
              <Card.Img variant='top' src='image4.jpg' />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.brand}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
