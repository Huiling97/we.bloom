import { Router, MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import CardProduct from '../../../../components/card/card-product';
import { cardProductMock } from '../../../__mocks__/card-mock';
import { createMemoryHistory } from 'history';

jest.mock('../../../../components/card/card-product/helpers', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(cardProductMock)),
}));

let container: HTMLElement;

const renderContentWithActionsNotEnabled = () => {
  const { container: renderedContainer } = render(
    <MemoryRouter>
      <CardProduct products={cardProductMock} areActionsEnabled={false} />
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
        <CardProduct products={cardProductMock} areActionsEnabled={false} />
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

  describe('are actions enabled for card', () => {
    it('should render Card component without actions enabled given areActionsEnabled is false', () => {
      renderContentWithActionsNotEnabled();

      const deleteBtn = screen.queryAllByRole('button', { name: /Delete/i });

      expect(deleteBtn).toHaveLength(0);
    });

    it('should render Card component with actions enabled given areActionsEnabled is true', () => {
      render(
        <MemoryRouter>
          <CardProduct products={cardProductMock} areActionsEnabled={true} />
        </MemoryRouter>
      );

      const deleteBtn = screen.getAllByRole('button', { name: /Delete/i });

      expect(deleteBtn).toHaveLength(2);
    });
  });
});
