import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import LoadingSpinner from '../../components/spinner/index.tsx';
import { type CardServiceObjectProps } from '../../types/components/card/card-service.ts';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';
import fetchServicesData from '../../util/fetch-services.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';
import { BackLink } from '../../components/link/index.tsx';
import fetchCategoriesData from '../../util/fetch-categories.ts';

const Service = () => {
  const { id } = useParams();
  const { categories } = useContext(CategoriesContext);
  const { services } = useContext(ServicesContext);

  fetchCategoriesData();
  fetchServicesData(`${id}`);

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
