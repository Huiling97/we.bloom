import { Router, MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { setupAxiosMock } from '../../../../util/axiosMockUtils';
import URLConstants from '../../../../../util/constants/url-constants';
import CardProduct from '../../../../../components/card/card-product';
import { cardProductMock } from '../../../../__mocks__/card-mock';
import { CartContext } from '../../../../../store/cart-context';
import { mockCartContextValue } from '../../../../__mocks__/store/cart-context-mock';

jest.mock('../../../../../components/card/card-product/helpers', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(cardProductMock)),
}));

let container: HTMLElement;

const renderContentWithActionsNotEnabled = () => {
  const { container: renderedContainer } = render(
    <MemoryRouter>
      <CartContext.Provider value={mockCartContextValue}>
        <CardProduct products={cardProductMock} />
      </CartContext.Provider>
    </MemoryRouter>
  );

  container = renderedContainer;
};

describe('CardProduct', () => {
  beforeAll(() => {
    setupAxiosMock(`${URLConstants.CART_PRODUCTS_PATH}/all`, []);
  });

  it('should render component with the correct number of Card component', async () => {
    renderContentWithActionsNotEnabled();

    await waitFor(() => {
      const productCard = container.getElementsByClassName('col');

      expect(productCard).toHaveLength(2);
    });
  });

  it('should render Card component with image', async () => {
    renderContentWithActionsNotEnabled();

    await waitFor(() => {
      const image = screen.getAllByRole('img');

      expect(image).toHaveLength(2);
    });
  });

  it('should render Card component with title', async () => {
    renderContentWithActionsNotEnabled();

    await waitFor(() => {
      const title = container.getElementsByClassName('card-title');

      expect(title).toHaveLength(2);
      expect(screen.getByText(cardProductMock[0].name)).toBeInTheDocument();
      expect(screen.getByText(cardProductMock[1].name)).toBeInTheDocument();
    });
  });

  it('should render Card component with the correct link', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <CardProduct products={cardProductMock} />
      </Router>
    );

    const linkElement = screen.getAllByRole('link')[0];

    fireEvent.click(linkElement);

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: `/shop/${cardProductMock[0].id}`,
        search: '',
      },
      undefined,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
        unstable_viewTransition: undefined,
      }
    );
  });

  describe('should render Card component with approriate cart actions', () => {
    it('should render `Add to cart` button given product is not in cart', () => {
      renderContentWithActionsNotEnabled();

      const cartBtn = screen.getAllByRole('button', { name: /Add to cart/i });

      expect(cartBtn).toHaveLength(1);
    });

    it('should render increment and decrement buttons given product is in cart', () => {
      renderContentWithActionsNotEnabled();

      const incrementBtn = screen.getAllByRole('button', { name: '+' });
      const decrementBtn = screen.getAllByRole('button', { name: '-' });

      expect(incrementBtn).toHaveLength(1);
      expect(decrementBtn).toHaveLength(1);
    });
  });
});
