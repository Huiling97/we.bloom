import { Dispatch, type SetStateAction } from 'react';

export type DropdownProps = {
  dropdownOption: string;
  setDropdownOption: Dispatch<SetStateAction<string>>;
  isDropdownInvalid: boolean;
  setIsDropdownInvalid: Dispatch<SetStateAction<boolean>>;
  selectedCategory?: string;
};
