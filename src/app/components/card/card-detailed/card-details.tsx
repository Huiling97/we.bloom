import { type CardDetailsProps } from '../../../types/card.ts';

import './style.scss';

const CardDetails = (details: CardDetailsProps) => {
  const { duration, price } = details;
  return (
    <div key={`${duration}`} className='card-details-item'>
      <div>{duration} mins</div>
      <div>${price}</div>
    </div>
  );
};

export default CardDetails;
