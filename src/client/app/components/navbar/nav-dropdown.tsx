import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Cart } from '@styled-icons/bootstrap';
import { CartContext } from '../../store/cart-context';
import { type CartItemsProps } from '../../types/context/cart';

const NavBarDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const totalItemsCount = cartItems.length;
  const getFirst5Items = cartItems.slice(0, 5);

  const displayCartItems = () => {
    return getFirst5Items.map((item) => {
      const { id, brand, name, price } = item as CartItemsProps;

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

  const viewCartHandler = () => {
    navigate('/cart');
  };

  return (
    <Nav>
      <NavDropdown title={displayCartIcon()} id='nav-dropdown'>
        {displayCartItems()}
        <NavDropdown.Divider />
        <div className='cart-summary-container'>
          {getRemainingItemsCount()}
          <NavDropdown.Item>
            <Button onClick={viewCartHandler}>View my cart</Button>
          </NavDropdown.Item>
        </div>
      </NavDropdown>
    </Nav>
  );
};

export default NavBarDropdown;
