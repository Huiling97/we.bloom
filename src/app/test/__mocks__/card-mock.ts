import { type CardGenericProps, CardDetailsProps } from '../../types/card.ts';

export const cardGenericProps: CardGenericProps = {
  title: 'Mock Title',
  image: {
    imageSrc: 'mock-image',
  },
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

export const cardDetailedProps = {
  title: 'mock title',
  description: 'Mock description',
  details: cardDetailsArrayProps,
};
