import { categoriesMock } from '../category-mock';

export const mockCategoriesContextValue = {
  categories: categoriesMock,
  setCategories: jest.fn(),
  addCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
};
