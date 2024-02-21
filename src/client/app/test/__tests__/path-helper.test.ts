import { isManageStorePage } from '../../util/path-helper';

describe('isManageStorePage', () => {
  beforeAll(() => {
    global.window = Object.create(window); // Mock window.location.pathname for all tests
    Object.defineProperty(window, 'location', {
      value: { pathname: '' },
    });
  });

  afterAll(() => {
    global.window = Object.create(window); // Restore original window object after all tests
  });

  it('returns true when window.location.pathname matches /manage/products', () => {
    global.window.location.pathname = '/manage/products';
    expect(isManageStorePage()).toBe(true);
  });

  it('returns false when window.location.pathname does not match /manage/products', () => {
    global.window.location.pathname = '/manage/categories';
    expect(isManageStorePage()).toBe(false);
  });

  it('returns false when window.location.pathname is empty', () => {
    global.window.location.pathname = '';
    expect(isManageStorePage()).toBe(false);
  });
});
