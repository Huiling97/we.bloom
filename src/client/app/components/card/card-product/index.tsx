import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import {
  type ProductProps,
  type CardProductProps,
} from '../../../types/components/card/card-product';
import { CartContext } from '../../../store/cart-context';
import { isManageStorePage } from '../../../util/path-helper';
import { getCartProductQuantity } from './helpers';

const CardProduct = ({ products }: CardProductProps) => {
  const { cartItems } = useContext(CartContext);

  const redirectionUrl = (productId: number) =>
    isManageStorePage()
      ? `/manage/products/${productId}`
      : `/shop/${productId}`;

  const cartActions = (productId: number) => {
    const cartProductQuantity = getCartProductQuantity(cartItems, productId);
    if (cartProductQuantity) {
      return (
        <div className='card-cart-product-actions'>
          <div>{cartProductQuantity}</div>
          <div className='cart-product-buttons'>
            <Button>+</Button>
            <Button>-</Button>
          </div>
        </div>
      );
    }
    return <Button variant='success'>Add to cart</Button>;
  };

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
                  <>{cartActions(productId)}</>
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
