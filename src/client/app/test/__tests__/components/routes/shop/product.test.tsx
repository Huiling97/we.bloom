import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Shop from '../../../../../routes/shop';
import Product from '../../../../../routes/shop/product';
import Error from '../../../../../routes/error';
import { ProductsContext } from '../../../../../store/products-context';
import { mockProductsContextValue } from '../../../../__mocks__/store/products-context-mock';

const renderContent = () => {
  return render(
    <MemoryRouter initialEntries={['/shop/1']}>
      <ProductsContext.Provider value={mockProductsContextValue}>
        <Routes>
          <Route path='/shop' element={<Shop areActionsEnabled={false} />} />
          <Route path='/shop/:id' element={<Product />} />
        </Routes>
      </ProductsContext.Provider>
    </MemoryRouter>
  );
};

describe('Product', () => {
  describe('given valid id', () => {
    describe('should render product details', () => {
      beforeEach(() => {
        renderContent();
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

    it('should render back to shop button with correct link', () => {
      renderContent();

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
    it('should redirect to error page given invalid id', () => {
      const history = createMemoryHistory();
      history.push('/shop/invalidId');

      render(
        <Router location={history.location} navigator={history}>
          <ProductsContext.Provider value={mockProductsContextValue}>
            <Routes>
              <Route path='/shop/:id' element={<Product />} />
              <Route path='/error' element={<Error />} />
            </Routes>
          </ProductsContext.Provider>
        </Router>
      );

      expect(history.location.pathname).toBe('/error');
    });
  });
});
