import { useContext, useEffect } from 'react';
import { isEmpty } from 'lodash';
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
import { getFromStorage } from '../../../util/storage-helper';
import { getCartsProducts } from '../../../service/carts-products-service';
import { addItemHandler, removeItemHandler } from './helpers';

const CardProduct = ({ products }: CardProductProps) => {
  const { cartItems, setCartItems, incrementCartItem, decrementCartItem } =
    useContext(CartContext);

  const redirectionUrl = (productId: number) =>
    isManageStorePage()
      ? `/manage/products/${productId}`
      : `/shop/${productId}`;

  const fetchData = async () => {
    const storageData = getFromStorage('cartItems');

    if (!storageData) {
      const cartProducts = await getCartsProducts();
      setCartItems(cartProducts);
      return cartProducts;
    }
    setCartItems(storageData);
    return storageData;
  };

  useEffect(() => {
    const initCartItems = async () => {
      if (isEmpty(cartItems)) {
        await fetchData();
      }
    };

    initCartItems();
  }, []);

  const cartActions = (product: ProductProps) => {
    const cartProduct = cartItems.find((item) => item.id === product.id);

    if (cartProduct) {
      const { quantity } = cartProduct;

      if (quantity) {
        return (
          <div className='card-cart-product-actions'>
            <div className='cart-product-description'>{quantity}</div>
            <div className='cart-product-button-container'>
              <Button
                onClick={() => addItemHandler(cartProduct, incrementCartItem)}
              >
                +
              </Button>
              <Button
                onClick={() =>
                  removeItemHandler(cartProduct, decrementCartItem)
                }
              >
                -
              </Button>
            </div>
          </div>
        );
      }
    } else {
      const addedProduct = {
        ...product,
        quantity: 0,
        total_price: product.price,
      };

      return (
        <Button
          variant='success'
          className='cart-product-button-container'
          onClick={() => addItemHandler(addedProduct, incrementCartItem)}
        >
          Add to cart
        </Button>
      );
    }
  };

  return (
    <Row xs={1} md={4} className='card-product-container'>
      {products.map((product: ProductProps) => {
        const { id } = product;

        return (
          <Col key={id}>
            <Card>
              <Link
                to={redirectionUrl(id)}
                className='link-no-decoration link-grey'
              >
                <Card.Img variant='top' src='image4.jpg' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                </Card.Body>
              </Link>
              <>{cartActions(product)}</>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
