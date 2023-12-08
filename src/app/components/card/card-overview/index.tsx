import { CardGenericProps } from '../../../types/card.ts';

import './style.scss';

const CardOverview = (data: CardGenericProps) => {
  return (
    <div className='card-overview-container'>
      {Object.entries(data).map(([key, value]) => {
        return (
          <div key={key}>
            <div>{key}</div>
            <img src={value.imageSrc} className='card-overview-image' />
          </div>
        );
      })}
    </div>
  );
};

export default CardOverview;
