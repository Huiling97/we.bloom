import { fireEvent, render } from '@testing-library/react';
import SearchBar from '../../../components/search';

describe('SearchBar', () => {
  const searchInput = 'test';
  const setSearchInput = jest.fn();

  it('should update search input value when typing', () => {
    const updatedInput = 'updated value';

    const { getByPlaceholderText } = render(
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    );

    const searchField = getByPlaceholderText('Start typing to search');
    fireEvent.change(searchField, { target: { value: updatedInput } });

    expect(setSearchInput).toHaveBeenCalledWith(updatedInput);
  });

  it('should clear the search input when losing focus', () => {
    const searchInput = 'test';
    const setSearchInput = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    );

    const searchField = getByPlaceholderText('Start typing to search');
    fireEvent.blur(searchField);

    expect(setSearchInput).toHaveBeenCalledWith('');
  });
});
