import { Link } from 'react-router-dom';
import { type ReactNode } from 'react';
import { type CardCategoryProps } from '../../../types/card/card-category';

const CardCategory = ({ name, image }: CardCategoryProps): ReactNode => {
  return (
    <div className='card-container'>
      <Link to={`/services/${name}`}>
        <div className='card-image-overlay'></div>
        <img src={image} alt='category image' className='card-image' />
        <div className='card-category-title'>{name.toUpperCase()}</div>
      </Link>
    </div>
  );
};

export default CardCategory;
