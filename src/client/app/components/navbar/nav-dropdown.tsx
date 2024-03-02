import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { Cart } from '@styled-icons/bootstrap';
import { CartContext } from '../../store/cart-context';
import { ProductsContext } from '../../store/products-context';
import { getProductByProductId } from '../card/card-product/helpers';
import { type ProductProps } from '../../types/components/card/card-product';

const NavBarDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

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
    const remainingItemsCount = cartItems.length - 5;

    if (remainingItemsCount > 0) {
      return (
        <NavDropdown.Item eventKey='remainingItemsCount'>
          {remainingItemsCount} more{' '}
          {remainingItemsCount === 1 ? 'product' : 'products'} in cart
        </NavDropdown.Item>
      );
    }
  };

  return (
    <Nav>
      <NavDropdown
        title={<Cart size='24' className='icon-grey' />}
        id='nav-dropdown'
      >
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
