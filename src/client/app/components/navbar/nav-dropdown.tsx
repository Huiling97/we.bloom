import { useContext } from 'react';
import { Badge, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Cart } from '@styled-icons/bootstrap';
import { CartContext } from '../../store/cart-context';
import { ProductsContext } from '../../store/products-context';
import {
  getCartTotalQuantity,
  getProductByProductId,
} from '../card/card-product/helpers';
import { type ProductProps } from '../../types/components/card/card-product';

const NavBarDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const totalItemsCount = getCartTotalQuantity(cartItems);
  const getFirst5Items = cartItems.slice(0, 5);

  const displayCartItems = () => {
    return getFirst5Items.map((item) => {
      const { product_id } = item;
      const cartProduct = getProductByProductId(products, product_id);

      const { id, brand, name, price } = cartProduct as ProductProps;

      return (
        <NavDropdown.Item eventKey={id} key={id}>
          <div className='cart-item-list-container'>
            <div className='font-bold'>{name}</div>
            <div>${price}</div>
          </div>
          <div>{brand}</div>
        </NavDropdown.Item>
      );
    });
  };

  const getRemainingItemsCount = () => {
    const remainingItemsCount = totalItemsCount - 5;

    if (remainingItemsCount > 0) {
      return (
        <NavDropdown.Item eventKey='remainingItemsCount'>
          {remainingItemsCount} more{' '}
          {remainingItemsCount === 1 ? 'product' : 'products'} in cart
        </NavDropdown.Item>
      );
    }
  };

  const displayCartIcon = () => {
    return (
      <>
        <Cart size='24' className='icon-grey' />
        <Badge bg='secondary'>{totalItemsCount}</Badge>
      </>
    );
  };

  return (
    <Nav>
      <NavDropdown title={displayCartIcon()} id='nav-dropdown'>
        {displayCartItems()}
        <NavDropdown.Divider />
        <div className='cart-summary-container'>
          {getRemainingItemsCount()}
          <NavDropdown.Item eventKey='viewCart'>
            <Button>View my cart</Button>
          </NavDropdown.Item>
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NavBarDropdown;
