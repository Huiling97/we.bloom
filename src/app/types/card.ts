import { type CardServiceFormInputProps } from './form.ts';

export interface CardDetailedProps {
  [category: string]: {
    [service: string]: {
      title: string;
      description: string;
      details: CardDetailsObjectProps;
    };
  };
}

export interface CardServicesProps {
  [category: string]: CardServiceFormInputProps[];
}

type CardDetailsObjectProps = {
  [details: string]: {
    info: CardDetailsProps;
  };
};

export type CardDetailsProps = {
  index: number;
  duration: string;
  price: string;
};

export type DetailsProps = {
  [id: string]: CardDetailsProps[];
};
