import { type CardServicesProps } from '../../types/card.ts';
import fetchServicesData from '../../util/fetch-services.ts';
import CardGrid from '../../components/card/card-grid/index.tsx';
import Banner from '../../components/banner/index.tsx';

const Nail = () => {
  const { isLoading, services } = fetchServicesData('nail');

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <Banner
            image='/src/app/assets/images/nail.jpg'
            title='Nail'
            description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
                        Treatments available for all skin types.'
          />
          <CardGrid type='detailed' cards={services as CardServicesProps[]} />
        </div>
      )}
    </div>
  );
};

export default Nail;
