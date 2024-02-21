import { productsMock } from '../product-mock.ts';

export const mockProductsContextValue = {
  products: productsMock,
  setProducts: jest.fn(),
  selectedProduct: {},
  setSelectedProduct: jest.fn(),
  addProducts: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};
