import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Shop from '../../../../routes/shop';
import { CategoriesContext } from '../../../../store/categories-context';
import { ProductsContext } from '../../../../store/products-context';
import { cardProductMock } from '../../../__mocks__/card-mock';
import { categoriesMock } from '../../../__mocks__/category-mock';

jest.mock('../../../../components/card/card-product/helpers');

describe('Shop', () => {
  describe('displays loading spinner while feteching data', () => {
    it('when categories data is being fetched while products data has been fetched', () => {
      render(
        <MemoryRouter>
          <CategoriesContext.Provider
            value={{
              categories: {},
              setCategories: jest.fn(),
              addCategory: jest.fn(),
              updateCategory: jest.fn(),
              deleteCategory: jest.fn(),
            }}
          >
            <ProductsContext.Provider
              value={{
                products: cardProductMock,
                setProducts: jest.fn(),
                addProducts: jest.fn(),
                deleteProduct: jest.fn(),
              }}
            >
              <Shop areActionsEnabled={false} />
            </ProductsContext.Provider>
          </CategoriesContext.Provider>
        </MemoryRouter>
      );
      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('when products data is being fetched while categories data has been fetched', () => {
      render(
        <MemoryRouter>
          <CategoriesContext.Provider
            value={{
              categories: categoriesMock,
              setCategories: jest.fn(),
              addCategory: jest.fn(),
              updateCategory: jest.fn(),
              deleteCategory: jest.fn(),
            }}
          >
            <ProductsContext.Provider
              value={{
                products: [],
                addProducts: jest.fn(),
                setProducts: jest.fn(),
                deleteProduct: jest.fn(),
              }}
            >
              <Shop areActionsEnabled={false} />
            </ProductsContext.Provider>
          </CategoriesContext.Provider>
        </MemoryRouter>
      );
      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('when both categories data and products data is being fetched', () => {
      render(
        <MemoryRouter>
          <CategoriesContext.Provider
            value={{
              categories: {},
              setCategories: jest.fn(),
              addCategory: jest.fn(),
              updateCategory: jest.fn(),
              deleteCategory: jest.fn(),
            }}
          >
            <ProductsContext.Provider
              value={{
                products: [],
                addProducts: jest.fn(),
                setProducts: jest.fn(),
                deleteProduct: jest.fn(),
              }}
            >
              <Shop areActionsEnabled={false} />
            </ProductsContext.Provider>
          </CategoriesContext.Provider>
        </MemoryRouter>
      );
      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  describe('displays content when data is fetched', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <CategoriesContext.Provider
            value={{
              categories: categoriesMock,
              setCategories: jest.fn(),
              addCategory: jest.fn(),
              updateCategory: jest.fn(),
              deleteCategory: jest.fn(),
            }}
          >
            <ProductsContext.Provider
              value={{
                products: cardProductMock,
                setProducts: jest.fn(),
                addProducts: jest.fn(),
                deleteProduct: jest.fn(),
              }}
            >
              <Shop areActionsEnabled={false} />
            </ProductsContext.Provider>
          </CategoriesContext.Provider>
        </MemoryRouter>
      );
    });

    it('should not display loading spinner', () => {
      const loadingSpinner = screen.queryByTestId('loading-spinner');

      expect(loadingSpinner).not.toBeInTheDocument();
    });

    it('displays category tabs', () => {
      const tabs = screen.getByRole('tablist');

      expect(tabs).toBeInTheDocument();
    });

    it('displays products', () => {
      const products = screen.getAllByRole('tabpanel');

      expect(products).toBeTruthy();
      expect(products).toHaveLength(3);
    });
  });
});
