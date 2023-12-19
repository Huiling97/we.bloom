import { type ReactNode } from 'react';
import { type CardGenericProps } from '../../../types/card';
import './styles.scss';

const CardGeneric = ({ name, image }: CardGenericProps): ReactNode => {
  return (
    <div className='card-container'>
      <a href={`/services/${name}`}>
        <div className='card-image-overlay'></div>
        <img src={image} alt='category image' className='card-image' />
        <div className='card-title'>{name.toUpperCase()}</div>
      </a>
    </div>
  );
};

export default CardGeneric;
