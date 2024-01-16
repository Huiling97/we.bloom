import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchProducts } from './helpers';
import { CardProductProps } from '../../../types/card/card-product';

const CardProduct = () => {
  const [allProducts, setAllProducts] = useState<CardProductProps[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await fetchProducts();
      setAllProducts(data);
    };

    getAllProducts();
  }, []);

  return (
    <Row xs={1} md={4} className='card-product-container'>
      {allProducts.map((product) => {
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
