import { getFromStorage, saveToStorage } from '../../util/storage-helper';
import { cartItemsMock } from '../__mocks__/cart-mock';

describe('saveToStorage', () => {
  it('should save data to local storage', () => {
    const key = 'testKey';

    saveToStorage(key, cartItemsMock);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(cartItemsMock));
  });
});

describe('getFromStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return data from local storage for an existing key', () => {
    const key = 'existingKey';

    localStorage.setItem(key, JSON.stringify(cartItemsMock));

    const result = getFromStorage(key);

    expect(result).toEqual(cartItemsMock);
  });

  it('should return null for a non-existing key', () => {
    const key = 'nonExistingKey';

    const result = getFromStorage(key);

    expect(result).toBeNull();
  });
});
