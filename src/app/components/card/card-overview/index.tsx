import Button from 'react-bootstrap/Button';
import {
  type CardGenericProps,
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import CardDetailed from '../card-detailed/index.tsx';

type onDeleteHandlerProps = (id: string) => void;
type onDeleteServiceHandlerProps = (key: string, id: string) => void;
type onEditHandlerProps = (value: CardGenericProps) => void;
type onEditServiceHandlerProps = (service: CardDetailedFormInputProps) => void;

const displayCategories = (
  data: CardGenericObjectProps,
  deleteModalHandler: onDeleteHandlerProps,
  onEditHandler: onEditHandlerProps
) => {
  return (
    <div className='card-overview-container'>
      {Object.entries(data).map(([key, value]) => {
        const { id, image } = value;
        return (
          <div key={id} role='listCategories' className='card-item-container'>
            <div className='card-overview-image-container'>
              <div className='card-overview-title'>{key.toUpperCase()}</div>
              <img
                src={image}
                alt='category name'
                className='card-overview-image'
              />
              <div className='buttons-container'>
                <Button
                  variant='secondary'
                  onClick={() => onEditHandler(value)}
                >
                  Edit
                </Button>
                <Button variant='danger' onClick={() => deleteModalHandler(id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const displayServiceCards = (
  key: string,
  serviceData: CardDetailedFormInputProps[],
  onDeleteServiceHandler: onDeleteServiceHandlerProps,
  onEditServiceHandler: onEditServiceHandlerProps
) => {
  return serviceData.map((service, index) => {
    const { id, name, description, details } = service;
    return (
      <div
        key={`${name}-${index}`}
        className='card-overview-detailed-container'
      >
        <CardDetailed name={name} description={description} details={details} />
        <div className='buttons-container'>
          <Button
            variant='secondary'
            onClick={() => onEditServiceHandler(service)}
          >
            Edit
          </Button>
          <Button
            variant='danger'
            onClick={() => onDeleteServiceHandler(key, id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });
};

const displayServices = (
  services: CardServicesProps,
  onDeleteServiceHandler: onDeleteServiceHandlerProps,
  onEditServiceHandler: onEditServiceHandlerProps
) => {
  return Object.entries(services).map(([key, value], index) => {
    if (value.length !== 0) {
      return (
        <div key={index} role='listServices'>
          <div className='card-overview-title'>{key.toUpperCase()}</div>
          <div className='card-overview-container'>
            {displayServiceCards(
              key,
              value,
              onDeleteServiceHandler,
              onEditServiceHandler
            )}
          </div>
        </div>
      );
    }
  });
};

export { displayCategories, displayServices };
