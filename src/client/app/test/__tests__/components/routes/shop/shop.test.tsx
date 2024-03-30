import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupAxiosMock } from '../../../../util/axiosMockUtils';
import URLConstants from '../../../../../util/constants/url-constants';
import Shop from '../../../../../routes/shop/shop';
import { CategoriesContext } from '../../../../../store/categories-context';
import { ProductsContext } from '../../../../../store/products-context';
import { mockCategoriesContextValue } from '../../../../__mocks__/store/categories-context-mock';
import { mockProductsContextValue } from '../../../../__mocks__/store/products-context-mock';
import { renderShopContextProps } from '../../../../__mocks__/store/context-mock';

jest.mock('../../../../../components/card/card-product/helpers');

const renderContext = (props: renderShopContextProps) => {
  const { categoriesContextValue, productsContextValue } = props;

  return render(
    <MemoryRouter>
      <CategoriesContext.Provider value={categoriesContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <Shop />
        </ProductsContext.Provider>
      </CategoriesContext.Provider>
    </MemoryRouter>
  );
};

describe('Shop', () => {
  beforeAll(() => {
    setupAxiosMock(`${URLConstants.CART_PRODUCTS_PATH}/all`, []);
  });

  describe('displays loading spinner while feteching data', () => {
    it('when categories data is being fetched while products data has been fetched', () => {
      renderContext({
        categoriesContextValue: {
          ...mockCategoriesContextValue,
          categories: {},
        },
        productsContextValue: mockProductsContextValue,
      });

      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('when products data is being fetched while categories data has been fetched', () => {
      renderContext({
        categoriesContextValue: mockCategoriesContextValue,
        productsContextValue: { ...mockProductsContextValue, products: [] },
      });

      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });

    it('when both categories data and products data is being fetched', () => {
      renderContext({
        categoriesContextValue: {
          ...mockCategoriesContextValue,
          categories: {},
        },
        productsContextValue: { ...mockProductsContextValue, products: [] },
      });

      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  describe('displays content when data is fetched', () => {
    beforeEach(() => {
      renderContext({
        categoriesContextValue: mockCategoriesContextValue,
        productsContextValue: mockProductsContextValue,
      });
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
