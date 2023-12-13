export interface CardGenericProps {
  title: string;
  image: {
    imageSrc: string;
  };
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
  category: string;
  name: string;
  description: string;
  details: CardDetailsProps[];
};
