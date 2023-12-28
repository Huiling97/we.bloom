import {
  isProtectedCategory,
  isProtectedService,
} from '../../util/auth-helper.ts';

describe('isProtectedCategory', () => {
  it('should return true if it is a protected category', () => {
    const mockId = '0bfb209f-fe46-4959-9841-138c3791aa2d';

    expect(isProtectedCategory(mockId)).toBe(true);
  });

  it('should return false if it is not a protected category', () => {
    const mockId = '000-111-222';

    expect(isProtectedCategory(mockId)).toBe(false);
  });
});

describe('isProtectedService', () => {
  it('should return true if it is a protected service', () => {
    const mockCategory = 'hair';
    const mockId = 'b66456f7-892b-4969-aaa9-5b4c0c788986';

    expect(isProtectedService(mockCategory, mockId)).toBe(true);
  });

  it('should return false if service id is invalid', () => {
    const mockValidCategory = 'hair';
    const mockInvalidId = '000-111-222';

    expect(isProtectedService(mockValidCategory, mockInvalidId)).toBe(false);
  });

  it('should return undefined if category is invalid', () => {
    const mockInvalidCategory = 'not-valid-category';
    const mockValidId = 'b66456f7-892b-4969-aaa9-5b4c0c788986';

    expect(isProtectedService(mockInvalidCategory, mockValidId)).toBe(
      undefined
    );
  });
});
