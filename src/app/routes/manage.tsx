import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  type CardServicesProps,
  type CardGenericProps,
  type CardGenericObjectProps,
  type CardDetailedFormInputProps,
} from '../types/card.ts';
import DeleteModal from '../components/modal/delete-modal.tsx';
import ShowModal from '../components/modal/form-modal.tsx';
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
import { ServicesContext } from '../store/services-context.tsx';
import { ref, set } from 'firebase/database';
import { database } from '../../main.tsx';

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

  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [catgeoryData, setCategoryData] = useState<CardGenericProps>({
    id: '',
    name: '',
    image: '',
  });
  const [serviceData, setServiceDate] = useState<CardDetailedFormInputProps>({
    id: '',
    category: '',
    name: '',
    description: '',
    details: [],
  });

  const deleteModalHandler = (id: string) => {
    setShowDeleteModal(true);
    setDeleteCategoryId(id);
  };

  const onEditCategoryHandler = (data: CardGenericProps) => {
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

  const onEditServiceHandler = (data: CardDetailedFormInputProps) => {
    setIsEditModal(true);
    setActiveForm('service');
    setShowModal(true);
    setServiceDate(data);
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
            {showDeleteModal && (
              <DeleteModal
                id={deleteCategoryId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
              />
            )}
            <Button variant='primary' onClick={addCategoryHandler}>
              Add new category
            </Button>
            <Button variant='primary' onClick={addServiceHandler}>
              Add new service
            </Button>
            {activeForm === 'category' && showModal && (
              <ShowModal
                heading={isEditModal ? 'Edit category' : 'Add new category'}
                form={CardGenericForm}
                show={showModal}
                isEditing={isEditModal}
                catgeoryData={catgeoryData}
              />
            )}
            {activeForm === 'service' && showModal && (
              <ShowModal
                heading={isEditModal ? 'Edit service' : 'Add new service'}
                form={CardDetailedForm}
                show={showModal}
                isEditing={isEditModal}
                categories={categoryType}
                service={serviceData as CardDetailedFormInputProps}
              />
            )}
            {categories &&
              displayCategories(
                categoriesCtx.categories as CardGenericObjectProps,
                deleteModalHandler,
                onEditCategoryHandler
              )}
            {services &&
              displayServices(
                services as CardServicesProps,
                onDeleteServiceHandler,
                onEditServiceHandler
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
