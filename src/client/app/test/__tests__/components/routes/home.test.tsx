import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../../routes/home.tsx';
import { CategoriesContext } from '../../../../store/categories-context.tsx';
import { mockCategoriesContextValue } from '../../../__mocks__/store/categories-context-mock.ts';

let container: HTMLElement;

describe('Home', () => {
  it('should display loading spinner while fetching categories data', () => {
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
            <Home />
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
