import { CardGenericProps } from '../../../types/card';
import './styles.scss';

const CardGeneric = (card: CardGenericProps) => {
  const { title, image } = card;
  return (
    <div className='card-container'>
      <img src={`src/app/assets/images/${image}.jpg`} className='card-image' />
      <div className='card-title'>{title}</div>
    </div>
  );
};

export default CardGeneric;
