export type CardDetailsProps = {
  index: number;
  duration: string;
  price: string;
};

type CardDetailsObjectProps = {
  [details: string]: {
    info: CardDetailsProps;
  };
};

export type CardDetailedProps = {
  [category: string]: {
    [service: string]: {
      title: string;
      description: string;
      details: CardDetailsObjectProps;
    };
  };
};

export type DetailsProps = {
  [id: string]: CardDetailsProps[];
};
