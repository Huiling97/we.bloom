import {
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import CardDetailed from '../card-detailed/index.tsx';

import './style.scss';

const displayCategories = (data: CardGenericObjectProps) => {
  return (
    <div className='card-overview-container'>
      {Object.entries(data).map(([key, value]) => {
        return (
          <div key={key} role='listCategories'>
            <div>{key}</div>
            <img
              src={value.image}
              alt='category name'
              className='card-overview-image'
            />
          </div>
        );
      })}
    </div>
  );
};

const displayServiceCards = (serviceData: CardDetailedFormInputProps[]) => {
  return serviceData.map((service, index) => {
    const { name, description, details } = service;
    return (
      <div
        key={`${name}-${index}`}
        className='card-overview-detailed-container'
      >
        <CardDetailed name={name} description={description} details={details} />
      </div>
    );
  });
};

const displayServices = (services: CardServicesProps) => {
  return Object.entries(services).map(([key, value], index) => {
    return (
      <div key={index} role='listServices'>
        <div className='card-overview-title'>{key}</div>
        <div className='card-overview-container'>
          {displayServiceCards(value)}
        </div>
      </div>
    );
  });
};

export { displayCategories, displayServices };
