import { type CardDetailsProps } from '../card.ts';

export type CardServiceProps = {
  name: string;
  description: string;
  details: CardDetailsProps[];
};
