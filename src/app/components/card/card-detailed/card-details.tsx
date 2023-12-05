import './style.scss';

export type CardDetailsProps = {
  duration: number;
  price: number;
};

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
