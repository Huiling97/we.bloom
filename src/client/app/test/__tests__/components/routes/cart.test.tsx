import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cart from '../../../../routes/cart';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../../../store/cart-context';
import { mockCartContextValue } from '../../../__mocks__/store/cart-context-mock';
import { type renderCartContextProps } from '../../../__mocks__/store/context-mock';

jest.mock('../../../../util/fetch-carts-products', () => ({
  fetchCartsProducts: jest.fn(() => Promise.resolve([])),
}));

let container: HTMLElement;

const renderContext = (props: renderCartContextProps) => {
  const { cartContextValue } = props;

  const { container: renderedContainer } = render(
    <MemoryRouter>
      <CartContext.Provider value={cartContextValue}>
        <Cart />
      </CartContext.Provider>
    </MemoryRouter>
  );

  container = renderedContainer;
};

describe('Cart', () => {
  describe('Given that the cart is not empty', () => {
    beforeEach(() => {
      renderContext({
        cartContextValue: mockCartContextValue,
      });
    });

    it('should display the back to shop link which redirects back to `/shop`', () => {
      const backLink = screen.getByRole('link', { name: /Back to shop/i });

      expect(backLink).toBeInTheDocument();

      fireEvent.click(backLink);

      waitFor(() => {
        expect(window.location.pathname).toBe('/shop');
      });
    });

    it('should display the cart items', () => {
      const items = container.getElementsByClassName('cart-content-container');

      expect(items).toHaveLength(1);
    });

    it('should display the subtotal', () => {
      const subTotal = screen.getByText(/21\.99/);
      const subTotalText = subTotal && (subTotal.textContent as string);

      const numericValue = parseFloat(subTotalText.replace(/\$/, '').trim());
      const roundedValue = Math.round(numericValue * 100) / 100; // round to two decimal places

      expect(roundedValue).toBeCloseTo(21.99, 2);
    });

    it('should display the checkout button', () => {
      const checkoutBtn = screen.getByRole('button', {
        name: /Continue to checkout/i,
      });

      expect(checkoutBtn).toBeInTheDocument();
    });
  });

  describe('Given that the cart is empty', () => {
    it('should display a button which redirects to `/shop`', () => {
      renderContext({
        cartContextValue: { ...mockCartContextValue, cartItems: [] },
      });

      const btn = screen.getByRole('button', { name: /Let's go shopping/i });

      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);

      waitFor(() => {
        expect(window.location.pathname).toBe('/shop');
      });
    });
  });
});
