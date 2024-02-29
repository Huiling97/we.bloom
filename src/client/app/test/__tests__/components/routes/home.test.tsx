import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from '../../../../routes/home.tsx';
import { CategoriesContext } from '../../../../store/categories-context.tsx';
import { mockCategoriesContextValue } from '../../../__mocks__/store/categories-context-mock.ts';
import { mockCartContextValue } from '../../../__mocks__/store/cart-context-mock.ts';
import { CartContext } from '../../../../store/cart-context.tsx';

let container: HTMLElement;
const mock = new MockAdapter(axios);

describe('Home', () => {
  beforeAll(() => {
    // Mock the Axios request for the test
    mock
      .onGet('http://localhost:5000/api/v1/carts-products/all')
      .reply(200, []);
  });

  it('displays loading spinner while fetching categories data', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  describe('displays content when categories data are fetched', () => {
    beforeEach(() => {
      const { container: renderedContainer } = render(
        <MemoryRouter>
          <CategoriesContext.Provider value={mockCategoriesContextValue}>
            <CartContext.Provider value={mockCartContextValue}>
              <Home />
            </CartContext.Provider>
          </CategoriesContext.Provider>
        </MemoryRouter>
      );

      container = renderedContainer;
    });

    it('should not display loading spinner', () => {
      const loadingSpinner = screen.queryByTestId('loading-spinner');

      expect(loadingSpinner).not.toBeInTheDocument();
    });

    it('displays the carousel', () => {
      const carousel = container.getElementsByClassName('carousel-container');

      expect(carousel).toBeTruthy();
    });

    it('displays the categories grid data', () => {
      const categoriesGrid = container.getElementsByClassName('grid-container');

      expect(categoriesGrid).toBeTruthy();
    });

    it('displays the reviews data', () => {
      const reviews = container.getElementsByClassName('slick-slider');

      expect(reviews).toBeTruthy();
    });
  });
});
