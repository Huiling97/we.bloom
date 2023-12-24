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
            Your one stop beauty salon equipped with both Oriental TCM and
            Western Technology to bring you the best results
          </div>
          <CardGrid type='generic' cards={categories} />
        </div>
      )}
    </div>
  );
};

export default AllServices;
