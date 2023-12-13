import fetchServicesData from '../../util/fetch-services.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';

const HairRemoval = () => {
  const { isLoading, services } = fetchServicesData('hair-removal');

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <Banner
            image='/src/app/assets/images/hair-removal.jpg'
            title='Hair Removal'
            description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
                        Treatments available for all skin types.'
          />
          <CardGrid type='detailed' cards={services} />
        </div>
      )}
    </div>
  );
};

export default HairRemoval;
