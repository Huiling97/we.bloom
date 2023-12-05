import { type ReactNode } from 'react';
import { type CardDetailsProps } from '../card-detailed/card-details.tsx';

import CardDetails from '../card-detailed/card-details.tsx';
import './style.scss';

export type CardDetailedProps = {
  title: string;
  description: string;
  details: CardDetailsProps[];
};

const displayCardDetails = (details: CardDetailsProps[]): ReactNode => {
  return (
    <>
      {details.map(({ duration, price }) => (
        <CardDetails duration={duration} price={price} />
      ))}
    </>
  );
};

const CardDetailed = ({ title, description, details }: CardDetailedProps) => {
  return (
    <div className='card-detailed-container'>
      <div className='card-detailed-title'>{title.toUpperCase()}</div>
      <p className='card-detailed-description'>{description}</p>
      {displayCardDetails(details)}
    </div>
  );
};

export default CardDetailed;
