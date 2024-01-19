import { type CardDetailsProps } from '../../../../types/components/card/card-service-details';

const CardDetails = (details: CardDetailsProps) => {
  const { duration, price } = details;
  return (
    <div role='listDetails' key={`${duration}`} className='card-details-item'>
      <div>{duration} mins</div>
      <div className='price-details'>
        | <div>${price}</div>
      </div>
    </div>
  );
};

export default CardDetails;
