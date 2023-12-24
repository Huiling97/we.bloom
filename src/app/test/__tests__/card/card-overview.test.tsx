import { fireEvent, render, screen } from '@testing-library/react';
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

  it('should render component with uppercase title', () => {
    const title = screen.getByText('MOCKCATEGORY1');

    expect(title).toBeInTheDocument();
  });

  it('should render component with image', () => {
    const image = screen.getAllByAltText('category name');

    expect(image).toBeTruthy();
    expect(image).toHaveLength(2);
  });

  it('should delete an entry when `Delete` button is clicked', () => {
    const deleteBtn = screen.getAllByRole('button', { name: 'Delete' });

    fireEvent.click(deleteBtn[0]);

    expect(mockOnDeleteHandler).toHaveBeenCalledTimes(1);

    const deletedEntry = screen.queryByText('category1');

    expect(deletedEntry).toBeNull();
  });

  it('should call the edit handler when `Edit` button is clicked', () => {
    const editBtn = screen.getAllByRole('button', { name: 'Edit' });

    fireEvent.click(editBtn[0]);

    expect(mockOnEditHandler).toHaveBeenCalledTimes(1);
  });
});

describe('displayServices', () => {
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

  it('should render component with correct number of components', () => {
    const titles = screen.getAllByRole('listServices');

    expect(titles).toHaveLength(2);
  });

  it('should render component with uppercase category title', () => {
    const title = screen.getByText('MOCKCATEGORY1');

    expect(title).toBeInTheDocument();
  });
});
