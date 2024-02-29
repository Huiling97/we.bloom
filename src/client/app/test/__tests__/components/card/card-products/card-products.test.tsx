import { Router, MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import CardProduct from '../../../../../components/card/card-product';
import { getCartProductQuantity } from '../../../../../components/card/card-product/helpers';
import { cardProductMock } from '../../../../__mocks__/card-mock';

jest.mock('../../../../../components/card/card-product/helpers', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(cardProductMock)),
  getCartProductQuantity: jest.fn(),
}));

let container: HTMLElement;

const renderContentWithActionsNotEnabled = () => {
  const { container: renderedContainer } = render(
    <MemoryRouter>
      <CardProduct products={cardProductMock} />
    </MemoryRouter>
  );

  container = renderedContainer;
};

describe('CardProduct', () => {
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
      (getCartProductQuantity as jest.Mock).mockReturnValueOnce(0);
      renderContentWithActionsNotEnabled();

      const cartBtn = screen.getAllByRole('button', { name: /Add to cart/i });

      expect(cartBtn).toHaveLength(2);
    });

    it('should render increment and decrement buttons given product is in cart', () => {
      (getCartProductQuantity as jest.Mock).mockReturnValueOnce(1);
      renderContentWithActionsNotEnabled();

      const incrementBtn = screen.getByRole('button', { name: '+' });
      const decrementBtn = screen.getByRole('button', { name: '-' });

      expect(incrementBtn).toBeInTheDocument();
      expect(decrementBtn).toBeInTheDocument();
    });
  });
});
