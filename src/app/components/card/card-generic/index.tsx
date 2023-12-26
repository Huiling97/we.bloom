import { Link } from 'react-router-dom';
import { type ReactNode } from 'react';
import { type CardGenericProps } from '../../../types/card';

const CardGeneric = ({ name, image }: CardGenericProps): ReactNode => {
  return (
    <div className='card-container'>
      <Link to={`/services/${name}`}>
        <div className='card-image-overlay'></div>
        <img src={image} alt='category image' className='card-image' />
        <div className='card-title'>{name.toUpperCase()}</div>
      </Link>
    </div>
  );
};

export default CardGeneric;
