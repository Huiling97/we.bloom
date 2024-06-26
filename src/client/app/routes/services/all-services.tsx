import { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { CategoryTypesContext } from '../../store/category-types-context.tsx';
import { CategoriesContext } from '../../store/categories-context.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';
import getCategories from '../../service/categories-service.ts';
import LoadingSpinner from '../../components/spinner/index.tsx';

const AllServices = () => {
  const { setCategoryTypes } = useContext(CategoryTypesContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEmpty(categories)) {
      getCategories(setCategoryTypes, setCategories, setIsLoading);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className='service-title'>SERVICES</div>
          <div className='service-description'>
            Discover the true essence of beauty with our exclusive range of
            personalized services. From head-turning hair transformations to
            rejuvenating skin therapies, indulge in a world of bespoke beauty
            treatments tailored just for you.
          </div>
          <CardGrid type='generic' cards={categories} />
        </div>
      )}
    </div>
  );
};

export default AllServices;
