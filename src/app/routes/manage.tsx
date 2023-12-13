import {
  type CardServicesProps,
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

const Manage = () => {
  const {
    isLoading: isLoadingCategories,
    categories,
    categoryType,
  } = fetchCategoriesData();
  const { isLoading: isLoadingServices, services } = fetchServicesData('');

  const isLoading = isLoadingCategories && isLoadingServices;

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <div>
            <ShowModal heading='Add new cateogry' form={CardGenericForm} />
            <ShowModal
              heading='Add new service'
              form={CardDetailedForm}
              categories={categoryType}
              services={services as CardServicesProps}
            />
            {categories &&
              displayCategories(categories as CardGenericObjectProps)}
            {services && displayServices(services as CardServicesProps)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
