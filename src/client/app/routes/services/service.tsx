import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import LoadingSpinner from '../../components/spinner/index.tsx';
import { type CardServiceObjectProps } from '../../types/components/card/card-service.ts';
import { CategoryTypesContext } from '../../store/category-types-context.tsx';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';
import getServices from '../../service/services-service.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';
import { BackLink } from '../../components/link/index.tsx';
import getCategories from '../../service/categories-service.ts';

const Service = () => {
  const { id } = useParams();
  const { setCategoryTypes } = useContext(CategoryTypesContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { services, setServices } = useContext(ServicesContext);

  useEffect(() => {
    getCategories(setCategoryTypes, setCategories);
    getServices(`${id}`, setServices);
  }, []);

  return (
    <div>
      {isEmpty(services) ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Banner
            image={`${categories[id!].image}`}
            title={`${id?.toUpperCase()}`}
            description={`${categories[id!].description}`}
          />
          <div className='content-container'>
            <BackLink link='/services' content='Back to all services' />
            <CardGrid
              type='detailed'
              cards={services as CardServiceObjectProps}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
