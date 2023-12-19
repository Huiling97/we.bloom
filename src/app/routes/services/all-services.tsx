import CardGrid from '../../components/card/card-grid';
import fetchCategoriesData from '../../util/fetch-categories';

const AllServices = () => {
  const { isLoading, categories } = fetchCategoriesData();

  return (
    <div>
      {isLoading || !categories ? (
        <p>Loading</p>
      ) : (
        <CardGrid type='generic' cards={categories} />
      )}
    </div>
  );
};

export default AllServices;
