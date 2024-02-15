import { screen, render, waitFor } from '@testing-library/react';
import { cardProductMock } from '../../../__mocks__/card-mock';
import CardProduct from '../../../../components/card/card-product';

jest.mock('../../../../components/card/card-product/helpers', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(cardProductMock)),
}));

let container: HTMLElement;

describe('CardProduct', () => {
  beforeEach(() => {
    const { container: renderedContainer } = render(
      <CardProduct products={cardProductMock} areActionsEnabled={false} />
    );

    container = renderedContainer;
  });

  it('should render component with the correct number of Card component', async () => {
    await waitFor(() => {
      const productCard = container.getElementsByClassName('col');

      expect(productCard).toHaveLength(2);
    });
  });

  it('should render Card component with image', async () => {
    await waitFor(() => {
      const image = screen.getAllByRole('img');

      expect(image).toHaveLength(2);
    });
  });

  it('should render Card component with title', async () => {
    await waitFor(() => {
      const title = container.getElementsByClassName('card-title');

      expect(title).toHaveLength(2);
      expect(screen.getByText(cardProductMock[0].name)).toBeInTheDocument();
      expect(screen.getByText(cardProductMock[1].name)).toBeInTheDocument();
    });
  });

  describe('are actions enabled for card', () => {
    it('should render Card component without actions enabled given areActionsEnabled is false', () => {
      render(
        <CardProduct products={cardProductMock} areActionsEnabled={false} />
      );

      const deleteBtn = screen.queryAllByRole('button', { name: /Delete/i });

      expect(deleteBtn).toHaveLength(0);
    });

    it('should render Card component with actions enabled given areActionsEnabled is true', () => {
      render(
        <CardProduct products={cardProductMock} areActionsEnabled={true} />
      );

      const deleteBtn = screen.getAllByRole('button', { name: /Delete/i });

      expect(deleteBtn).toHaveLength(2);
    });
  });
});
