import { type CardDetailsProps } from '../../types/components/card/card-service-details.ts';
import { type CardServiceFormInputProps } from '../../types/components/form.ts';
import { type CardCategoryProps } from '../../types/components/card/card-category.ts';

export const cardGenericProps: CardCategoryProps = {
  id: '123',
  name: 'Mock Title',
  image: 'mock-image',
};

export const cardDetailsProps: CardDetailsProps = {
  index: 1,
  duration: '60',
  price: '85',
};

export const cardDetailsArrayProps = [
  {
    index: 0,
    duration: '60',
    price: '85',
  },
  {
    index: 1,
    duration: '60',
    price: '85',
  },
  {
    index: 2,
    duration: '60',
    price: '85',
  },
];

export const cardDetailedProps: CardServiceFormInputProps = {
  id: '123',
  category: 'mock category',
  name: 'mock title',
  description: 'Mock description',
  details: cardDetailsArrayProps,
};

export const cardProductMock = [
  {
    id: 1,
    brand: 'Luminous Beauty',
    category: 'face',
    name: 'Radiant Glow Serum',
    size: '50ml',
    rating: 3.5,
    reviews_count: 11,
    price: 29,
    details: 'test details',
    usage: 'test usage',
    ingredients: 'test ingredients',
  },
  {
    id: 2,
    brand: 'Ethereal Elegance',
    category: 'face',
    name: 'Silk Elixir Moisturizer',
    size: '50ml',
    rating: 3.5,
    reviews_count: 11,
    price: 29,
    details: 'test details',
    usage: 'test usage',
    ingredients: 'test ingredients',
  },
];
