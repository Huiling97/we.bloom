import { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Button from 'react-bootstrap/Button';
import { type CardServiceFormInputProps } from '../../types/components/form.ts';
import { type CardCategoryProps } from '../../types/components/card/card-category.ts';
import DeleteModal from '../../components/modal/delete-modal.tsx';
import ShowModal from '../../components/modal/form-modal.tsx';
import CardCategoryForm from '../../components/card/card-category/form.tsx';
import CardServiceForm from '../../components/card/card-services/form.tsx';
import TabSwitch from '../../components/tabs/index.tsx';
import AuthForm from '../../components/form/auth-form.tsx';
import LoadingSpinner from '../../components/spinner/index.tsx';
import { BackLink } from '../../components/link';
import getCategories from '../../service/categories-service.ts';
import getServices from '../../service/services-service.ts';
import { isProtectedCategory } from '../../util/auth-helper.ts';
import { ModalContext } from '../../store/modal-context.tsx';
import { CategoryTypesContext } from '../../store/category-types-context.tsx';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';
import { DetailsContext } from '../../store/details-context.tsx';
import { v4 as uuidv4 } from 'uuid';
import { ref, set, update } from 'firebase/database';
import { database } from '../../../main.tsx';

const Manage = () => {
  const formId = uuidv4();
  const {
    showModal,
    setShowModal,
    isEditModal,
    setIsEditModal,
    isAuthModal,
    setIsAuthModal,
  } = useContext(ModalContext);
  const { categoryTypes, setCategoryTypes } = useContext(CategoryTypesContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { services, setServices } = useContext(ServicesContext);
  const servicesCtx = useContext(ServicesContext);
  const { setDetails } = useContext(DetailsContext);

  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [catgeoryData, setCategoryData] = useState<CardCategoryProps>({
    id: '',
    name: '',
    image: '',
    servicesCount: 0,
  });
  const [serviceData, setServiceDate] = useState<CardServiceFormInputProps>({
    id: '',
    category: '',
    name: '',
    description: '',
    details: [],
  });
  const [isLoading, setIsLoading] = useState(true);

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

        const updateServicesCount = categories[categoryKey].servicesCount! - 1;

        set(ref(database, 'services/' + categoryKey), remainingServices);
        update(ref(database, 'categories/' + categoryKey), {
          servicesCount: updateServicesCount,
        });
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
    getCategories(setCategoryTypes, setCategories, setIsLoading);
    getServices('', setServices, setIsLoading);
  }, []);

  console.log('check isLoading', isLoading);

  return (
    <div>
      <BackLink link='/manage' content='Back' />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='manage-page-container'>
          <div className='buttons-container left'>
            <Button variant='primary' onClick={addCategoryHandler}>
              Add new category
            </Button>
            <Button variant='primary' onClick={addServiceHandler}>
              Add new service
            </Button>
          </div>
          <div className='tabs-container'>
            <TabSwitch
              deleteCategory={deleteCategoryModalHandler}
              editCategory={onEditCategoryHandler}
              deleteService={onDeleteServiceHandler}
              editService={onEditServiceHandler}
            />
          </div>
          <div className='tabs-content-container'>
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
                categoryTypes={categoryTypes}
                service={serviceData as CardServiceFormInputProps}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
