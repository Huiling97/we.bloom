import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManageProducts from '../../../../../routes/manage/manage-products';
import { CategoriesContext } from '../../../../../store/categories-context';
import { ProductsContext } from '../../../../../store/products-context';
import { mockCategoriesContextValue } from '../../../../__mocks__/store/categories-context-mock';
import { mockProductsContextValue } from '../../../../__mocks__/store/products-context-mock';

jest.mock('../../../../../components/card/card-product/helpers');

const renderEmptyContext = () => {
  return render(
    <MemoryRouter>
      <CategoriesContext.Provider
        value={{ ...mockCategoriesContextValue, categories: {} }}
      >
        <ProductsContext.Provider
          value={{ ...mockProductsContextValue, products: [] }}
        >
          <ManageProducts />
        </ProductsContext.Provider>
      </CategoriesContext.Provider>
    </MemoryRouter>
  );
};

const renderMockedContext = () => {
  return render(
    <MemoryRouter>
      <CategoriesContext.Provider value={mockCategoriesContextValue}>
        <ProductsContext.Provider value={mockProductsContextValue}>
          <ManageProducts />
        </ProductsContext.Provider>
      </CategoriesContext.Provider>
    </MemoryRouter>
  );
};

describe('ManageProducts', () => {
  describe('while feteching data', () => {
    beforeAll(() => {
      renderEmptyContext();
    });

    it('should display loading spinner', () => {
      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('should not display add product buttons', () => {
      const addProductBtn = screen.queryByRole('button', {
        name: /Add new product$/i,
      });

      expect(addProductBtn).not.toBeInTheDocument();
    });
  });

  describe('displays content when data is fetched', () => {
    beforeEach(() => {
      renderMockedContext();
    });

    it('should not display loading spinner', () => {
      const loadingSpinner = screen.queryByTestId('loading-spinner');

      expect(loadingSpinner).not.toBeInTheDocument();
    });

    it('should display add product button', () => {
      const addProductBtn = screen.getByRole('button', {
        name: /Add new product$/i,
      });

      expect(addProductBtn).toBeInTheDocument();
    });

    it('should display shop contents', () => {
      const tabs = screen.getByRole('tablist');
      const products = screen.getAllByRole('tabpanel');

      expect(tabs).toBeInTheDocument();
      expect(products).toBeTruthy();
      expect(products).toHaveLength(3);
    });
  });
});
