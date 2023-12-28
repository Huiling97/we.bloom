import { isProtectedCategory } from '../../util/auth-helper.ts';

describe('isProtectedCategory', () => {
  it('should return true if id is a protected id', () => {
    const id = '0bfb209f-fe46-4959-9841-138c3791aa2d';

    expect(isProtectedCategory(id)).toBeTruthy();
  });

  it('should return false if id is not a protected id', () => {
    const id = '000-111-222';

    expect(isProtectedCategory(id)).toBeFalsy();
  });
});
