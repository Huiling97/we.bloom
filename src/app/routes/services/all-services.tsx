import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { CategoriesContext } from '../../store/categories-context';
import CardGrid from '../../components/card/card-grid';
import fetchCategoriesData from '../../util/fetch-categories';
import '../../assets/style/routes/_all-services.scss';

const AllServices = () => {
  const { categories } = useContext(CategoriesContext);

  if (isEmpty(categories)) {
    fetchCategoriesData();
  }

  return (
    <div>
      {isEmpty(categories) ? (
        <p>Loading</p>
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
