export interface CardGenericProps {
  title: string;
  image: {
    imageSrc: string;
  };
}

export interface CardDetailedObjectProps {
  [category: string]: {
    [service: string]: {
      title: string;
      description: string;
      details: CardDetailsObjectProps;
    };
  };
}

type CardDetailsObjectProps = {
  [details: string]: {
    info: CardDetailsProps;
  };
};

export type CardDetailsProps = {
  duration: number;
  price: number;
};
