import { get } from 'lodash';
import { PROTECTED_IDS } from './constants.ts';

const users: { [key: string]: string } = {
  [import.meta.env.VITE_LOGIN_USERNAME]: import.meta.env.VITE_LOGIN_PASSWORD,
};

const isProtectedCategory = (id: string) => PROTECTED_IDS.includes(id);

const checkCredentials = (username: string, password: string) => {
  if (users[username]) {
    const retrievePassword = get(users, `${username}`);
    return retrievePassword === password;
  }
  return false;
};

export { isProtectedCategory, checkCredentials };
