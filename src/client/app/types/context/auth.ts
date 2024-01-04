import { Dispatch, type SetStateAction } from 'react';

export type AuthContextProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};
