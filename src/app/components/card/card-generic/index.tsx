import { type ReactNode } from 'react';
import { type CardGenericProps } from '../../../types/card';
import './styles.scss';

const CardGeneric = ({ title, image }: CardGenericProps): ReactNode => {
  return (
    <div className='card-container'>
      <a href={`/services/${title}`}>
        <img src={image.imageSrc} alt='category image' className='card-image' />
        <div className='card-title'>{title}</div>
      </a>
    </div>
  );
};

export default CardGeneric;
