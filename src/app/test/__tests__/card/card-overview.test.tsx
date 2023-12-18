import { render, screen } from '@testing-library/react';
import {
  displayCategories,
  displayServices,
} from '../../../components/card/card-overview/index.tsx';
import {
  cardGenericArrayProps,
  cardDetailedArrayProps,
} from '../../__mocks__/card-mock.ts';

describe('displayCategories', () => {
  const mockOnDeleteHandler = jest.fn();
  const mockOnEditHandler = jest.fn();

  beforeEach(() => {
    render(
      displayCategories(
        cardGenericArrayProps,
        mockOnDeleteHandler,
        mockOnEditHandler
      )
    );
  });

  it('should render the correct number of components', () => {
    const categoriesArr = screen.getAllByRole('listCategories');

    expect(categoriesArr).toHaveLength(2);
  });

  it('should render component with title', () => {
    const title = screen.getByText('MockCategory1');

    expect(title).toBeInTheDocument();
  });

  it('should render component with image', () => {
    const image = screen.getAllByAltText('category name');

    expect(image).toBeTruthy();
    expect(image).toHaveLength(2);
  });
});

describe('displayServices', () => {
  describe('categories', () => {
    const mockOnDeleteServiceHandler = jest.fn();
    const mockOnEditServiceHandler = jest.fn();

    beforeEach(() => {
      render(
        <>
          {displayServices(
            cardDetailedArrayProps,
            mockOnDeleteServiceHandler,
            mockOnEditServiceHandler
          )}
        </>
      );
    });

    it('should render component with correct number of categories', () => {
      const titles = screen.getAllByRole('listServices');

      expect(titles).toHaveLength(2);
    });
  });
});
