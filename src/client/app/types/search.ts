import { Dispatch, type SetStateAction } from 'react';

export type SearchBarProps = {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
};
