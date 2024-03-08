import { formatPrice } from '../../util/format-helper';

describe('formatPrice', () => {
  it('should return formatted price with 2 decimal place given input has no decimal place', () => {
    const input = 123;

    expect(formatPrice(input)).toEqual('123.00');
  });

  it('should return price as it is given input has decimal place', () => {
    const input = 10.99;

    expect(formatPrice(input)).toEqual(10.99);
  });
});
