import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { setupAxiosMock } from '../../../../util/axiosMockUtils';
import URLConstants from '../../../../../util/constants/url-constants';
import Shop from '../../../../../routes/shop/shop';
import Product from '../../../../../routes/shop/product';
import Error from '../../../../../routes/error';
import { ProductsContext } from '../../../../../store/products-context';
import { mockProductsContextValue } from '../../../../__mocks__/store/products-context-mock';

const renderContentWithValidId = () => {
  return render(
    <MemoryRouter initialEntries={['/shop/1']}>
      <ProductsContext.Provider value={mockProductsContextValue}>
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route
            path='/shop/:id'
            element={<Product areActionsEnabled={false} />}
          />
        </Routes>
      </ProductsContext.Provider>
    </MemoryRouter>
  );
};

const renderContentWithActionsEnabled = () => {
  return render(
    <MemoryRouter initialEntries={['/shop/1']}>
      <ProductsContext.Provider value={mockProductsContextValue}>
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route
            path='/shop/:id'
            element={<Product areActionsEnabled={true} />}
          />
        </Routes>
      </ProductsContext.Provider>
    </MemoryRouter>
  );
};

describe('Product', () => {
  beforeAll(() => {
    setupAxiosMock(`${URLConstants.CART_PRODUCTS_PATH}/all`, []);
  });

  describe('given valid id', () => {
    describe('should render product details', () => {
      beforeEach(() => {
        renderContentWithValidId();
      });

      it('should render product image', async () => {
        await waitFor(() => {
          const image = screen.getByRole('img');

          expect(image).toBeInTheDocument();
        });
      });

      it('should render product brand', async () => {
        await waitFor(() => {
          const brand = screen.getByText(/Mock brand 1/i);

          expect(brand).toBeInTheDocument();
        });
      });

      it('should render product name', async () => {
        await waitFor(() => {
          const name = screen.getByText(/Mock name 1/i);

          expect(name).toBeInTheDocument();
        });
      });

      it('should render product price', async () => {
        await waitFor(() => {
          const price = screen.getByText(/10/i);

          expect(price).toBeInTheDocument();
        });
      });

      it('should render product description', async () => {
        await waitFor(() => {
          const description = screen.getByText(/Mock details 1/i);

          expect(description).toBeInTheDocument();
        });
      });
    });

    describe('are actions enabled', () => {
      it('should render page without actions enabled given areActionsEnabled is false', () => {
        renderContentWithValidId();

        const deleteBtn = screen.queryByRole('button', { name: /Delete/i });

        expect(deleteBtn).not.toBeInTheDocument();
      });

      it('should render page with actions enabled given areActionsEnabled is true', () => {
        renderContentWithActionsEnabled();

        const deleteBtn = screen.getByRole('button', { name: /Delete/i });

        expect(deleteBtn).toBeInTheDocument();
      });
    });

    it('should render back to shop button with correct link', () => {
      renderContentWithValidId();

      const backBtn = screen.getByRole('link', {
        name: /Back to all products/i,
      });

      expect(backBtn).toBeInTheDocument();

      fireEvent.click(backBtn);

      waitFor(() => {
        expect(window.location.pathname).toBe('/shop');
      });
    });
  });

  describe('given invalid id', () => {
    it('should redirect to error page', () => {
      const history = createMemoryHistory();
      history.push('/shop/invalidId');

      render(
        <Router location={history.location} navigator={history}>
          <ProductsContext.Provider value={mockProductsContextValue}>
            <Routes>
              <Route
                path='/shop/:id'
                element={<Product areActionsEnabled={false} />}
              />
              <Route path='/error' element={<Error />} />
            </Routes>
          </ProductsContext.Provider>
        </Router>
      );

      expect(history.location.pathname).toBe('/error');
    });
  });
});
