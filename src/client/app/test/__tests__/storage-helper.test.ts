import { getFromStorage, saveToStorage } from '../../util/storage-helper';

describe('saveToStorage', () => {
  it('should save data to local storage', () => {
    const key = 'testKey';
    const data = [{ id: 1, value: 'test value' }];

    saveToStorage(key, data);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(data));
  });
});

describe('getFromStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return data from local storage for an existing key', () => {
    const key = 'existingKey';
    const data = [{ id: 1, value: 'test value' }];

    localStorage.setItem(key, JSON.stringify(data));

    const result = getFromStorage(key);

    expect(result).toEqual(data);
  });

  it('should return null for a non-existing key', () => {
    const key = 'nonExistingKey';

    const result = getFromStorage(key);

    expect(result).toBeNull();
  });
});
