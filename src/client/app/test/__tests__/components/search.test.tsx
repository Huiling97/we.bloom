import { fireEvent, render } from '@testing-library/react';
import SearchBar from '../../../components/search';

describe('SearchBar', () => {
  const searchInput = 'test';
  const setSearchInput = jest.fn();

  it('should update search input value when typing', () => {
    const updatedInput = 'updated value';

    const { getByRole } = render(
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    );

    const searchField = getByRole('searchField');
    fireEvent.change(searchField, { target: { value: updatedInput } });

    expect(setSearchInput).toHaveBeenCalledWith(updatedInput);
  });

  it('should clear the search input when losing focus', () => {
    const searchInput = 'test';
    const setSearchInput = jest.fn();

    const { getByRole } = render(
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    );

    const searchField = getByRole('searchField');
    fireEvent.blur(searchField);

    expect(setSearchInput).toHaveBeenCalledWith('');
  });
});
