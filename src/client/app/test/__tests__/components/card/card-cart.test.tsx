import { render, screen } from '@testing-library/react';
import CartItem from '../../../../components/card/card-cart';
import { cartItemsMock } from '../../../__mocks__/cart-mock';

let container: HTMLElement;

describe('CartItem', () => {
  beforeEach(() => {
    const { container: renderedContainer } = render(
      <CartItem cartItems={cartItemsMock} />
    );

    container = renderedContainer;
  });

  it('should display as many cart items as there are in cart', () => {
    const items = container.getElementsByClassName('cart-item-container');

    expect(items).toHaveLength(2);
  });

  it('should display the details of the cart item', () => {
    const brand = screen.getByText('Mock brand 1');
    const name = screen.getByText('Mock name 1');
    const size = screen.getByText('10ml');
    const price = screen.getByText('$10.00');
    const quantity = screen.getByText(1);

    expect(brand).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });

  it('should display buttons to increment and decrement quantity', () => {
    const decrementBtn = screen.getAllByText('-');
    const incrementBtn = screen.getAllByText('+');

    expect(decrementBtn).toHaveLength(2);
    expect(incrementBtn).toHaveLength(2);
  });
});
