import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllServices from '../../../../../routes/services/all-services';
import { CategoriesContext } from '../../../../../store/categories-context';
import { mockCategoriesContextValue } from '../../../../__mocks__/store/categories-context-mock';

let container: HTMLElement;

describe('AllServices', () => {
  it('displays loading spinner while fetching categories data', () => {
    render(<AllServices />);
    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  describe('displays content when categories data are fetched', () => {
    beforeEach(() => {
      const { container: renderedContainer } = render(
        <MemoryRouter>
          <CategoriesContext.Provider value={mockCategoriesContextValue}>
            <AllServices />
          </CategoriesContext.Provider>
        </MemoryRouter>
      );

      container = renderedContainer;
    });

    it('displays the the title', () => {
      const title = container.getElementsByClassName('service-title');

      expect(title).toBeTruthy();
    });

    it('displays the the description', () => {
      const description = container.getElementsByClassName(
        'service-description'
      );

      expect(description).toBeTruthy();
    });

    it('displays the categories grid data', () => {
      const categoriesGrid = container.getElementsByClassName('grid-container');

      expect(categoriesGrid).toBeTruthy();
    });
  });
});
