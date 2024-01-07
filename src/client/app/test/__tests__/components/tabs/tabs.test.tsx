import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TabSwitch from '../../../../components/tabs';
import { CategoriesContext } from '../../../../store/categories-context';
import { ServicesContext } from '../../../../store/services-context';
import { categoriesMock } from '../../../__mocks__/category-mock';
import { servicesMock } from '../../../__mocks__/service-mock';

const switchProps = {
  deleteCategory: jest.fn(),
  editCategory: jest.fn(),
  deleteService: jest.fn(),
  editService: jest.fn(),
};

describe('TabSwitch', () => {
  beforeEach(() => {
    render(
      <CategoriesContext.Provider
        value={{
          categories: categoriesMock,
          setCategories: jest.fn(),
          addCategory: jest.fn(),
          updateCategory: jest.fn(),
          deleteCategory: jest.fn(),
        }}
      >
        <ServicesContext.Provider
          value={{
            services: servicesMock,
            setServices: jest.fn(),
            addService: jest.fn(),
            updateService: jest.fn(),
            deleteService: jest.fn(),
          }}
        >
          <TabSwitch {...switchProps} />
        </ServicesContext.Provider>
      </CategoriesContext.Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the component', () => {
    const tabOptions = screen.getByRole('tablist');
    const tabContent = screen.getByRole('tabpanel', { name: 'All' });

    expect(tabOptions).toBeInTheDocument();
    expect(tabContent).toBeInTheDocument();
  });

  it('should switch between tabs', () => {
    const activeTab = screen.getByText('Mock category1 name');
    const inactiveTab = screen.getByText('All');
    fireEvent.click(activeTab);

    expect(activeTab).toHaveClass('active');
    expect(inactiveTab).not.toHaveClass('active');
  });

  describe('should display categories based on search input', () => {
    it('should display all categories if search input field is empty', () => {
      const searchInputField = screen.getByRole('searchField');

      fireEvent.change(searchInputField, { target: { value: '' } });

      expect(screen.getByText('MOCK CATEGORY1 NAME')).toBeInTheDocument();
      expect(screen.getByText('MOCK CATEGORY2 NAME')).toBeInTheDocument();
    });

    it('should only display filtered categories based on search input', () => {
      const searchInputField = screen.getByRole('searchField');

      fireEvent.change(searchInputField, { target: { value: 'category1' } });

      const activeCategory = screen.getByText('MOCK CATEGORY1 NAME');

      expect(activeCategory).toBeInTheDocument();
    });
  });

  describe('should display services based on search input', () => {
    it('should display all services if search input field is empty', () => {
      const searchInputField = screen.getByRole('searchField');
      const activeTab = screen.getByText('Mock category1 name');

      fireEvent.click(activeTab);
      fireEvent.change(searchInputField, { target: { value: '' } });

      expect(screen.getByText('SERVICE 1.1')).toBeInTheDocument();
      expect(screen.getByText('SERVICE 1.2')).toBeInTheDocument();
    });

    it('should only display filtered services based on search input', () => {
      const searchInputField = screen.getByRole('searchField');
      const activeTab = screen.getByText('Mock category1 name');

      fireEvent.click(activeTab);
      fireEvent.change(searchInputField, { target: { value: '1.1' } });

      const activeService = screen.getByText('SERVICE 1.1');

      expect(activeService).toBeInTheDocument();
    });
  });
});
