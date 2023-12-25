import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { ChevronBack } from 'styled-icons/ionicons-solid';
import { type CardServicesProps } from '../../types/card.ts';
import { ServicesContext } from '../../store/services-context.tsx';
import fetchServicesData from '../../util/fetch-services.ts';
import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';

const Service = () => {
  const { id } = useParams();
  const { services } = useContext(ServicesContext);

  fetchServicesData(`${id}`);

  return (
    <div>
      {isEmpty(services) ? (
        <div>Loading</div>
      ) : (
        <div>
          <Banner
            image={`/src/app/assets/images/${id}.jpg`}
            title={`${id?.toUpperCase()}`}
            description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
                        Treatments available for all skin types.'
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
