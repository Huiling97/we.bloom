import { productsMock } from '../product-mock.ts';

export const mockProductsContextValue = {
  products: productsMock,
  setProducts: jest.fn(),
  addProducts: jest.fn(),
  deleteProduct: jest.fn(),
};
