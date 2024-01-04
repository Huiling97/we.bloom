import { isValidPhone } from '../../util/phone-helper';

describe('isValidPhone', () => {
  it('should return true if phone number is a string with 8 digits', () => {
    const mockValidNumber = '12345678';

    expect(isValidPhone(mockValidNumber)).toBe(true);
  });

  it('should return false if phone number is a string containing 8 characters other than digits', () => {
    const mockInvalidNumber = '123abc45';

    expect(isValidPhone(mockInvalidNumber)).toBe(false);
  });

  it('should return false if phone number is a string with less than 8 digits', () => {
    const mockInvalidNumber = '1234567';

    expect(isValidPhone(mockInvalidNumber)).toBe(false);
  });

  it('should return false if phone number is a string with more than 8 digits', () => {
    const mockInvalidNumber = '123456789';

    expect(isValidPhone(mockInvalidNumber)).toBe(false);
  });
});
