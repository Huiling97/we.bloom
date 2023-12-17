import { useContext, useEffect, useState } from 'react';
import {
  type CardServicesProps,
  type CardGenericProps,
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
} from '../types/card.ts';
import ShowModal from '../components/modal/index.tsx';
import CardGenericForm from '../components/card/card-generic/form.tsx';
import CardDetailedForm from '../components/card/card-detailed/form.tsx';
import {
  displayCategories,
  displayServices,
} from '../components/card/card-overview/index.tsx';
import fetchCategoriesData from '../util/fetch-categories.ts';
import fetchServicesData from '../util/fetch-services.ts';
import { ModalContext } from '../store/modal-context.tsx';
import { CategoriesContext } from '../store/categories-context.tsx';
import { ref, set } from 'firebase/database';
import { database } from '../../main.tsx';
import Button from 'react-bootstrap/Button';
import { ServicesContext } from '../store/services-context.tsx';

const Manage = () => {
  const {
    isLoading: isLoadingCategories,
    categories,
    categoryType,
  } = fetchCategoriesData();
  const { isLoading: isLoadingServices, services } = fetchServicesData('');
  const isLoading = isLoadingCategories && isLoadingServices;

  const { showModal, setShowModal, isEditModal, setIsEditModal } =
    useContext(ModalContext);
  const categoriesCtx = useContext(CategoriesContext);
  const servicesCtx = useContext(ServicesContext);

  const [activeForm, setActiveForm] = useState<string>('');

  const [catgeoryData, setCategoryData] = useState<CardGenericProps>({
    id: '',
    name: '',
    image: '',
  });

  const getCategoryById = (categories: CardGenericObjectProps, id: string) => {
    return Object.values(categories).find((category) => category.id === id);
  };

  const onDeleteHandler = (id: string) => {
    if (categories) {
      const selectedCategory = getCategoryById(categories, id);
      if (selectedCategory) {
        const { name } = selectedCategory;
        categoriesCtx.deleteCategory(id);
        set(ref(database, 'categories/' + name), null);
      }
    }
  };

  const onEditHandler = (data: CardGenericProps) => {
    setIsEditModal(true);
    setActiveForm('category');
    setShowModal(true);
    setCategoryData(data);
  };

  const addCategoryHandler = () => {
    setActiveForm('category');
    setShowModal(true);
  };

  const addServiceHandler = () => {
    setActiveForm('service');
    setShowModal(true);
  };

  const onDeleteServiceHandler = (categoryKey: string, id: string) => {
    if (services) {
      servicesCtx.deleteService(categoryKey, id);
      const categoryServices = services[
        categoryKey
      ] as CardDetailedFormInputProps[];

      if (categoryServices) {
        const remainingServices = categoryServices.filter(
          (service: CardDetailedFormInputProps) => service.id !== id
        );
        set(ref(database, 'services/' + categoryKey), remainingServices);
      }
    }
  };

  useEffect(() => {
    if (services) {
      servicesCtx.setServices(services);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <div>
            <Button variant='primary' onClick={addCategoryHandler}>
              Add new cateogry
            </Button>
            <Button variant='primary' onClick={addServiceHandler}>
              Add new service
            </Button>
            {activeForm === 'category' && showModal && (
              <ShowModal
                heading='Add new cateogry'
                form={CardGenericForm}
                show={showModal}
                isEditing={isEditModal}
                catgeoryData={catgeoryData}
              />
            )}
            {activeForm === 'service' && showModal && (
              <ShowModal
                heading='Add new service'
                form={CardDetailedForm}
                categories={categoryType}
                services={services as CardServicesProps}
                show={showModal}
                isEditing={false}
              />
            )}
            {categories &&
              displayCategories(
                categoriesCtx.categories as CardGenericObjectProps,
                onDeleteHandler,
                onEditHandler
              )}
            {services &&
              displayServices(
                services as CardServicesProps,
                onDeleteServiceHandler
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
