export interface CardGenericProps {
  id: string;
  name: string;
  image: string;
}

export interface CardGenericObjectProps {
  [category: string]: CardGenericProps;
}

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
  [category: string]: CardDetailedFormInputProps[];
}

type CardDetailsObjectProps = {
  [details: string]: {
    info: CardDetailsProps;
  };
};

export type CardDetailsProps = {
  duration: string;
  price: string;
};

export type CardDetailedFormInputProps = {
  id: string;
  category: string;
  name: string;
  description: string;
  details: CardDetailsProps[];
};

export type DetailsProps = {
  [id: string]: CardDetailsProps[];
};
