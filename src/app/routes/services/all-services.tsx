import CardGrid from '../../components/card/card-grid';
import fetchCategoriesData from '../../util/fetch-categories';
import '../../assets/style/routes/_all-services.scss';

const AllServices = () => {
  const { isLoading, categories } = fetchCategoriesData();

  return (
    <div>
      {isLoading || !categories ? (
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
