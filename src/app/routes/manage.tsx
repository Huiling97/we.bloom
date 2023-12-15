import { useContext, useEffect, useState } from 'react';
import {
  type CardServicesProps,
  type CardGenericProps,
  type CardGenericObjectProps,
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

const Manage = () => {
  const {
    isLoading: isLoadingCategories,
    categories,
    categoryType,
  } = fetchCategoriesData();
  const { isLoading: isLoadingServices, services } = fetchServicesData('');
  const isLoading = isLoadingCategories && isLoadingServices;

  const categoriesCtx = useContext(CategoriesContext);
  const { showModal, setShowModal, isEditModal, setIsEditModal } =
    useContext(ModalContext);

  const [editId, setEditId] = useState('');

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

  const onEditHandler = (id: string) => {
    setIsEditModal(true);
    setShowModal(true);
    setEditId(id);
  };

  useEffect(() => {
    categoriesCtx.setCategories(categories);
  }, [categories]);

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <div>
            <ShowModal
              heading='Add new cateogry'
              form={CardGenericForm}
              show={showModal}
              isEditing={isEditModal}
              editId={editId}
            />
            <ShowModal
              heading='Add new service'
              form={CardDetailedForm}
              categories={categoryType}
              services={services as CardServicesProps}
              show={false}
              isEditing={false}
              editId={editId}
            />
            {categories &&
              displayCategories(
                categoriesCtx.categories as CardGenericObjectProps,
                onDeleteHandler,
                onEditHandler
              )}
            {services && displayServices(services as CardServicesProps)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
