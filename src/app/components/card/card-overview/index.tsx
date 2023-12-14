import Button from 'react-bootstrap/Button';
import {
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import CardDetailed from '../card-detailed/index.tsx';
import './style.scss';

type onDeleteHandlerProps = (id: string) => void;

const displayCategories = (
  data: CardGenericObjectProps,
  onDeleteHandler: onDeleteHandlerProps
) => {
  return (
    <div className='card-overview-container'>
      {Object.entries(data).map(([key, value]) => {
        const { id, image } = value;
        return (
          <div key={id} role='listCategories'>
            <div>{key}</div>
            <img
              src={image}
              alt='category name'
              className='card-overview-image'
            />
            <Button variant='danger' onClick={() => onDeleteHandler(id)}>
              Delete
            </Button>
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
