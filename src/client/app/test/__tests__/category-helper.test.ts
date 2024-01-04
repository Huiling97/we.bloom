import { getCategoryById } from '../../util/category-helper';
import { categoriesMock } from '../__mocks__/category-mock';

describe('getCategoryById', () => {
  it('should return the cateogry by id', () => {
    const id = '123';
    expect(getCategoryById(categoriesMock, id)).toEqual({
      id: '123',
      name: 'Mock category1 name',
      image: 'Mock-category1-image',
      description: 'Mock category1 description',
    });
  });
});
