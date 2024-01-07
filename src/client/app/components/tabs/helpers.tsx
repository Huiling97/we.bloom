import Button from 'react-bootstrap/Button';
import { type CardServiceFormInputProps } from '../../types/form.ts';
import { type CardCategoryProps } from '../../types/card/card-category.ts';
import {
  type onDeleteCategoryHandlerProps,
  type onEditHandlerCategoeyProps,
  type onDeleteServiceHandlerProps,
  type onEditServiceHandlerProps,
} from '../../types/tabs.ts';
import CardService from '../card/card-services/index.tsx';

const serviceItem = (
  serviceData: CardServiceFormInputProps,
  deleteService: onDeleteServiceHandlerProps,
  editService: onEditServiceHandlerProps
) => {
  const { id, category, name, description, details } = serviceData;

  return (
    <div className='service-item-container'>
      <CardService name={name} description={description} details={details} />
      <div className='buttons-container bottom'>
        <Button variant='secondary' onClick={() => editService(serviceData)}>
          Edit
        </Button>
        <Button variant='danger' onClick={() => deleteService(category, id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

const displayServices = (
  services: CardServiceFormInputProps[],
  deleteService: onDeleteServiceHandlerProps,
  editService: onEditServiceHandlerProps
) => {
  return (
    <div className='tab-grid-container'>
      {services &&
        services.map((service, index) => {
          return (
            <div
              key={index}
              role='listServices'
              className='list-item-container'
            >
              {serviceItem(service, deleteService, editService)}
            </div>
          );
        })}
    </div>
  );
};

const displayCategories = (
  data: CardCategoryProps[],
  deleteCategory: onDeleteCategoryHandlerProps,
  editCategory: onEditHandlerCategoeyProps
) => {
  return (
    <div className='tab-grid-container'>
      {data.map((category) => {
        const { id, name, image } = category;
        return (
          <div key={id} role='listCategories' className='list-item-container'>
            <div className='item-image-container'>
              <div className='item-title'>{name.toUpperCase()}</div>
              <img src={image} alt='category name' className='item-image' />
              <div className='buttons-container-fixed'>
                <Button
                  variant='secondary'
                  onClick={() => editCategory(category)}
                >
                  Edit
                </Button>
                <Button variant='danger' onClick={() => deleteCategory(id)}>
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

export { displayCategories, displayServices };
