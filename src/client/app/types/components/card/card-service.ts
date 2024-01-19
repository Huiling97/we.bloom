import { type CardDetailsProps } from './card-service-details.ts';
import { type CardServiceFormInputProps } from '../form.ts';

export type CardServiceProps = {
  name: string;
  description: string;
  details: CardDetailsProps[];
};

export interface CardServiceObjectProps {
  [category: string]: CardServiceFormInputProps[];
}
