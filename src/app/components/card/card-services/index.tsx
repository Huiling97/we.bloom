import { type ReactNode } from 'react';
import { type CardDetailsProps } from '../../../types/card/card-service-details.ts';
import { type CardServiceProps } from '../../../types/card/card-service.ts';
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

const CardService = ({ name, description, details }: CardServiceProps) => {
  return (
    <div className='card-service-container'>
      <div>
        <div className='card-service-title'>{name.toUpperCase()}</div>
        <p className='card-service-description'>{description}</p>
      </div>
      {details && displayCardDetails(details)}
    </div>
  );
};

export default CardService;
