import { type ReactNode } from 'react';
import { type CardDetailsProps } from '../../../types/card.ts';

import CardDetails from './details/index.tsx';
import './style.scss';

export type CardDetailedProps = {
  name: string;
  description: string;
  details: CardDetailsProps[];
};

const displayCardDetails = (details: CardDetailsProps[]): ReactNode => {
  return (
    <>
      {details.map(({ duration, price }, index) => (
        <CardDetails
          index={index}
          key={index}
          duration={duration}
          price={price}
        />
      ))}
    </>
  );
};

const CardDetailed = ({ name, description, details }: CardDetailedProps) => {
  return (
    <div className='card-detailed-container'>
      <div className='card-detailed-title'>{name.toUpperCase()}</div>
      <p className='card-detailed-description'>{description}</p>
      {displayCardDetails(details)}
    </div>
  );
};

export default CardDetailed;
