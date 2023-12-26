import { type ReactNode } from 'react';
import { type CardDetailsProps } from '../../../types/card.ts';
import { type CardServiceDetailsProps } from '../../../types/card/card-service-details.ts';
import CardDetails from './details/index.tsx';

const displayCardDetails = (details: CardDetailsProps[]): ReactNode => {
  return (
    <div>
      {details.map(({ duration, price }, index) => (
        <CardDetails
          index={index}
          key={index}
          duration={duration}
          price={price}
        />
      ))}
    </div>
  );
};

const CardDetailed = ({
  name,
  description,
  details,
}: CardServiceDetailsProps) => {
  return (
    <div className='card-detailed-container'>
      <div>
        <div className='card-detailed-title'>{name.toUpperCase()}</div>
        <p className='card-detailed-description'>{description}</p>
      </div>
      {details && displayCardDetails(details)}
    </div>
  );
};

export default CardDetailed;
