import { type CardServicesProps } from '../../types/card.ts';
import fetchServicesData from '../../util/fetch-services.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';

const Body = () => {
  const { isLoading, services } = fetchServicesData('body');

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <Banner
            image='/src/app/assets/images/body.jpg'
            title='Body'
            description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
                        Treatments available for all skin types.'
          />
          <CardGrid type='detailed' cards={services as CardServicesProps[]} />
        </div>
      )}
    </div>
  );
};

export default Body;
