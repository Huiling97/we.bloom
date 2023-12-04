import { type ReactNode } from 'react';

import './style.scss';

export type CardOverviewProps = {
  title: string;
  image: string;
};

export type CardDetailedProps = {
  title: string;
  description: string;
  details: CardDetailsProps[];
};

type CardDetailsProps = {
  duration: number;
  price: number;
};

export type CardTypeProps = 'overview' | 'detailed';
type CardsProps = CardOverviewProps | CardDetailedProps;

type CardProps<T extends CardTypeProps, C extends CardsProps> = {
  type: T;
  card: C;
};

const displayCardDetails = (details: CardDetailsProps[]): ReactNode => {
  return (
    <>
      {details.map(({ duration, price }) => (
        <div key={`${duration}-${price}`}>
          <div>{duration}m</div>
          <div>${price}</div>
        </div>
      ))}
    </>
  );
};

const CardItem = <T extends CardTypeProps, C extends CardsProps>({
  type,
  card,
}: CardProps<T, C>): ReactNode => {
  if (type === 'detailed') {
    const { title, description, details } = card as CardDetailedProps;
    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
        {displayCardDetails(details)}
      </div>
    );
  }

  const { title, image } = card as CardOverviewProps;
  return (
    <div className='card-item-container'>
      <img src={`src/assets/images/${image}.jpg`} className='card-item-image' />
      <div className='card-item-title'>{title}</div>
    </div>
  );
};

export default CardItem;
