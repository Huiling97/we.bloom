import {
  type CardGenericProps,
  type CardDetailsProps,
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../../types/card.ts';

export const cardGenericProps: CardGenericProps = {
  id: '123',
  name: 'Mock Title',
  image: 'mock-image',
};

export const cardGenericArrayProps = {
  MockCategory1: cardGenericProps,
  MockCategory2: cardGenericProps,
};

export const cardDetailsProps: CardDetailsProps = {
  duration: '60',
  price: '85',
};

const cardDetailsArrayProps = [
  cardDetailsProps,
  cardDetailsProps,
  cardDetailsProps,
];

export const cardDetailedProps: CardDetailedFormInputProps = {
  category: 'mock category',
  name: 'mock title',
  description: 'Mock description',
  details: cardDetailsArrayProps,
};

export const cardDetailedArrayProps: CardServicesProps = {
  MockCategory1: [cardDetailedProps, cardDetailedProps],
  MockCategory2: [cardDetailedProps],
};
