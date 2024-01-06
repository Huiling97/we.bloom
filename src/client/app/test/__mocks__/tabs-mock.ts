import { type CardServiceFormInputProps } from '../../types/form.ts';
import { cardDetailsArrayProps } from './card-mock.ts';

export const categoryArrayProps = [
  {
    id: '123',
    name: 'Mock Title 1',
    image: 'mock-image-1',
  },
  {
    id: '456',
    name: 'Mock Title 2',
    image: 'mock-image-2',
  },
];

export const serviceArrayProps: CardServiceFormInputProps[] = [
  {
    id: '123',
    category: 'mock category 1',
    name: 'mock title 1',
    description: 'Mock description 1',
    details: cardDetailsArrayProps,
  },
  {
    id: '456',
    category: 'mock category 2',
    name: 'mock title 2',
    description: 'Mock description 2',
    details: cardDetailsArrayProps,
  },
];
