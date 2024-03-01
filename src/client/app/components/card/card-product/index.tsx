import { useContext, useEffect } from 'react';
import { debounce, isEmpty } from 'lodash';
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
import { fetchCartsProducts } from '../../../util/fetch-carts-products';
import { getCartProductQuantity } from './helpers';
import { updateCartItems } from '../../../service/cartService';

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
      const cartProducts = await fetchCartsProducts();
      setCartItems(cartProducts);
      return cartProducts;
    }
    setCartItems(storageData);
    return storageData;
  };

  const addItemHandlder = async (
    productId: number,
    cartProductQuantity: number,
    price: number
  ) => {
    const updatedQuantity = cartProductQuantity + 1;
    debounce(async () => {
      await updateCartItems(
        productId,
        cartProductQuantity,
        updatedQuantity,
        price
      );
    }, 1000)();
    incrementCartItem(productId, price);
  };

  const removeItemHandlder = async (
    productId: number,
    cartProductQuantity: number,
    price: number
  ) => {
    const updatedQuantity = cartProductQuantity - 1;
    await updateCartItems(
      productId,
      cartProductQuantity,
      updatedQuantity,
      price
    );
    decrementCartItem(productId);
  };

  useEffect(() => {
    const initCartItems = async () => {
      if (isEmpty(cartItems)) {
        await fetchData();
      }
    };

    initCartItems();
  }, []);

  const cartActions = (productId: number, price: number) => {
    const cartProductQuantity = getCartProductQuantity(cartItems, productId);
    if (cartProductQuantity) {
      return (
        <div className='card-cart-product-actions'>
          <div className='cart-product-description'>{cartProductQuantity}</div>
          <div className='cart-product-button-container'>
            <Button
              onClick={() =>
                addItemHandlder(productId, cartProductQuantity, price)
              }
            >
              +
            </Button>
            <Button
              onClick={() =>
                removeItemHandlder(productId, cartProductQuantity, price)
              }
            >
              -
            </Button>
          </div>
        </div>
      );
    }
    return (
      <Button
        variant='success'
        className='cart-product-button-container'
        onClick={() => addItemHandlder(productId, cartProductQuantity, price)}
      >
        Add to cart
      </Button>
    );
  };

  return (
    <Row xs={1} md={4} className='card-product-container'>
      {products.map((product: ProductProps) => {
        const { id, price } = product;

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
              <>{cartActions(id, price)}</>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardProduct;
