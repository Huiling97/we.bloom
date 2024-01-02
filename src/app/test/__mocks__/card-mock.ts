import { type CardDetailsProps } from '../../types/card/card-service-details.ts';
import { type CardServiceObjectProps } from '../../types/card/card-service.ts';
import { type CardServiceFormInputProps } from '../../types/form.ts';
import { type CardCategoryProps } from '../../types/card/card-category.ts';

export const cardGenericProps: CardCategoryProps = {
  id: '123',
  name: 'Mock Title',
  image: 'mock-image',
};

export const cardGenericArrayProps = {
  MockCategory1: {
    id: '123',
    name: 'Mock Title 1',
    image: 'mock-image-1',
  },
  MockCategory2: {
    id: '456',
    name: 'Mock Title 2',
    image: 'mock-image-2',
  },
};

export const cardDetailsProps: CardDetailsProps = {
  index: 1,
  duration: '60',
  price: '85',
};

const cardDetailsArrayProps = [
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

export const cardDetailedArrayProps: CardServiceObjectProps = {
  MockCategory1: [cardDetailedProps, cardDetailedProps],
  MockCategory2: [cardDetailedProps],
};
