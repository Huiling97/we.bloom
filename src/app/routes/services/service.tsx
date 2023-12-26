import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import LoadingSpinner from '../../components/spinner/index.tsx';
import { ChevronBack } from 'styled-icons/ionicons-solid';
import { type CardServicesProps } from '../../types/card.ts';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';
import fetchServicesData from '../../util/fetch-services.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';
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
            image={`/src/app/assets/images/${id}.jpg`}
            title={`${id?.toUpperCase()}`}
            description={`${categories[id!].description}`}
          />
          <div className='content-container'>
            <Link to={'/services'} className='back-button link-no-decoration'>
              <ChevronBack size='28' className='back-button-icon' />
              <div>Back to all services</div>
            </Link>
            <CardGrid type='detailed' cards={services as CardServicesProps} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
