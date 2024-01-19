import { type ChangeEvent } from 'react';
import { type SearchBarProps } from '../../types/components/search';

const SearchBar = ({ searchInput, setSearchInput }: SearchBarProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  const onBlurHandler = () => {
    setSearchInput('');
  };

  return (
    <input
      type='search'
      role='searchField'
      value={searchInput}
      placeholder='Start typing to search'
      className='search-input'
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  );
};

export default SearchBar;
