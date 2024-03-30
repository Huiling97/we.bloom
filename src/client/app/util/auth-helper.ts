import { get } from 'lodash';
import { type ProtectedService } from '../types/util.ts';
import {
  PROTECTED_CATEGORY_IDS,
  PROTECTED_SERVICE_IDS,
} from './constants/constants.ts';

const users: { [key: string]: string } = {
  [import.meta.env.VITE_LOGIN_USERNAME]: import.meta.env.VITE_LOGIN_PASSWORD,
};

const isProtectedCategory = (id: string) => PROTECTED_CATEGORY_IDS.includes(id);

const isProtectedService = (category: string, id: string) => {
  const selectedCategory: string[] =
    PROTECTED_SERVICE_IDS[category as ProtectedService];
  return selectedCategory && selectedCategory.includes(id);
};

const checkCredentials = (username: string, password: string) => {
  if (users[username]) {
    const retrievePassword = get(users, `${username}`);
    return retrievePassword === password;
  }
  return false;
};

export { isProtectedCategory, isProtectedService, checkCredentials };
