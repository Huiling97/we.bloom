import fetchServicesData from '../../util/fetch-services.ts';
import CardGrid from '../../components/card/card-grid/index.tsx';
import Banner from '../../components/banner/index.tsx';

const Face = () => {
  const { isLoading, services } = fetchServicesData('face');

  <div>
    {isLoading ? (
      <div>Loading</div>
    ) : (
      <div>
        <Banner
          image='/src/app/assets/images/face.jpg'
          title='Face'
          description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
                        Treatments available for all skin types.'
        />
        <CardGrid type='detailed' cards={services} />
      </div>
    )}
  </div>;
};

export default Face;
