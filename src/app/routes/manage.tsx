import { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Button from 'react-bootstrap/Button';
import { type CardServicesProps } from '../types/card.ts';
import { type CardServiceFormInputProps } from '../types/form.ts';
import {
  type CardCategoryProps,
  type CardCategoryObjectProps,
} from '../types/card/card-category.ts';
import DeleteModal from '../components/modal/delete-modal.tsx';
import ShowModal from '../components/modal/form-modal.tsx';
import CardCategoryForm from '../components/card/card-category/form.tsx';
import CardServiceForm from '../components/card/card-services/form.tsx';
import AuthForm from '../components/form/auth-form.tsx';
import {
  displayCategories,
  displayServices,
} from '../components/card/card-overview/index.tsx';
import fetchCategoriesData from '../util/fetch-categories.ts';
import fetchServicesData from '../util/fetch-services.ts';
import { isProtectedCategory } from '../util/auth-helper.ts';
import { ModalContext } from '../store/modal-context.tsx';
import { CategoriesContext } from '../store/categories-context.tsx';
import { ServicesContext } from '../store/services-context.tsx';
import { DetailsContext } from '../store/details-context.tsx';
import { v4 as uuidv4 } from 'uuid';
import { ref, set } from 'firebase/database';
import { database } from '../../main.tsx';

const Manage = () => {
  const formId = uuidv4();

  const {
    isLoading: isLoadingCategories,
    categories,
    categoryType,
  } = fetchCategoriesData();
  const { isLoading: isLoadingServices, services } = fetchServicesData('');

  const {
    showModal,
    setShowModal,
    isEditModal,
    setIsEditModal,
    isAuthModal,
    setIsAuthModal,
  } = useContext(ModalContext);
  const categoriesCtx = useContext(CategoriesContext);
  const servicesCtx = useContext(ServicesContext);
  const { setDetails } = useContext(DetailsContext);

  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [catgeoryData, setCategoryData] = useState<CardCategoryProps>({
    id: '',
    name: '',
    image: '',
  });
  const [serviceData, setServiceDate] = useState<CardServiceFormInputProps>({
    id: '',
    category: '',
    name: '',
    description: '',
    details: [],
  });

  const deleteCategoryModalHandler = (id: string) => {
    if (isProtectedCategory(id)) {
      setIsAuthModal(true);
    } else {
      setShowDeleteModal(true);
    }
    setDeleteCategoryId(id);
  };

  const onEditCategoryHandler = (data: CardCategoryProps) => {
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
      ] as CardServiceFormInputProps[];

      if (categoryServices) {
        const remainingServices = categoryServices.filter(
          (service: CardServiceFormInputProps) => service.id !== id
        );
        set(ref(database, 'services/' + categoryKey), remainingServices);
      }
    }
  };

  const onEditServiceHandler = (data: CardServiceFormInputProps) => {
    setIsEditModal(true);
    setActiveForm('service');
    setShowModal(true);
    setServiceDate(data);
    setDetails(data.details);
  };

  useEffect(() => {
    if (services) {
      servicesCtx.setServices(services);
    }
  }, []);

  return (
    <div>
      {isLoadingCategories || isLoadingServices ? (
        <div>loading</div>
      ) : (
        <div className='manage-page-container'>
          {isAuthModal ? (
            <ShowModal
              heading='Please vaildate to continue'
              form={AuthForm}
              formId={deleteCategoryId}
              show={isAuthModal}
            />
          ) : (
            <DeleteModal
              id={deleteCategoryId}
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}

          <div className='buttons-container left'>
            <Button variant='primary' onClick={addCategoryHandler}>
              Add new category
            </Button>
            <Button variant='primary' onClick={addServiceHandler}>
              Add new service
            </Button>
          </div>

          {isEmpty(categories) && <div>No data yet</div>}

          {activeForm === 'category' && showModal && (
            <ShowModal
              heading={isEditModal ? 'Edit category' : 'Add new category'}
              form={CardCategoryForm}
              show={showModal}
              catgeoryData={catgeoryData}
            />
          )}
          {activeForm === 'service' && showModal && (
            <ShowModal
              heading={isEditModal ? 'Edit service' : 'Add new service'}
              form={CardServiceForm}
              formId={formId}
              show={showModal}
              categories={categoryType}
              service={serviceData as CardServiceFormInputProps}
            />
          )}
          {categories &&
            displayCategories(
              categoriesCtx.categories as CardCategoryObjectProps,
              deleteCategoryModalHandler,
              onEditCategoryHandler
            )}
          {services &&
            displayServices(
              services as CardServicesProps,
              onDeleteServiceHandler,
              onEditServiceHandler
            )}
        </div>
      )}
    </div>
  );
};

export default Manage;
