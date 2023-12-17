import Button from 'react-bootstrap/Button';
import {
  type CardGenericProps,
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import CardDetailed from '../card-detailed/index.tsx';
import './style.scss';

type onDeleteHandlerProps = (id: string) => void;
type onDeleteServiceHandler = (key: string, id: string) => void;
type onEditHandlerProps = (value: CardGenericProps) => void;

const displayCategories = (
  data: CardGenericObjectProps,
  onDeleteHandler: onDeleteHandlerProps,
  onEditHandler: onEditHandlerProps
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
            <Button variant='danger' onClick={() => onEditHandler(value)}>
              Edit
            </Button>
            <Button variant='danger' onClick={() => onDeleteHandler(id)}>
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const displayServiceCards = (
  key: string,
  serviceData: CardDetailedFormInputProps[],
  onDeleteServiceHandler: onDeleteServiceHandler
) => {
  return serviceData.map((service, index) => {
    const { id, name, description, details } = service;
    return (
      <div
        key={`${name}-${index}`}
        className='card-overview-detailed-container'
      >
        <CardDetailed name={name} description={description} details={details} />
        <Button
          variant='danger'
          onClick={() => onDeleteServiceHandler(key, id)}
        >
          Delete
        </Button>
      </div>
    );
  });
};

const displayServices = (
  services: CardServicesProps,
  onDeleteServiceHandler: onDeleteServiceHandler
) => {
  return Object.entries(services).map(([key, value], index) => {
    if (value.length !== 0) {
      return (
        <div key={index} role='listServices'>
          <div className='card-overview-title'>{key}</div>
          <div className='card-overview-container'>
            {displayServiceCards(key, value, onDeleteServiceHandler)}
          </div>
        </div>
      );
    }
  });
};

export { displayCategories, displayServices };
