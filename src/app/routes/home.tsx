import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { Whatsapp } from '@styled-icons/boxicons-logos';
import { CategoriesContext } from '../store/categories-context.tsx';
import CarouselBanner from '../components/carousel/index.tsx';
import CardGrid from '../components/card/card-grid/index.tsx';
import CardReview from '../components/card/card-review/index.tsx';
import Separator from '../components/separator/index.tsx';
import fetchCategoriesData from '../util/fetch-categories.ts';
import { isMobile } from '../util/screen-size-helper.ts';

const REVIEWS_LIST = [
  {
    title: 'My skin is finally able to breathe again',
    description:
      'I have sensitive skin and the beautician Jean has been very detailed about my facial service, every session was very skilful and relaxing for me. Overall, I received professional services and would recommend Xiu House! ',
    user: 'April',
  },
  {
    title: 'Absolutely thrilled with my experience at this beauty shop!',
    description:
      'The staff was incredibly knowledgeable and friendly, guiding me through a personalized skincare routine that has truly transformed my complexion. The serene atmosphere and top-notch service made me feel pampered and rejuvenated. Highly recommended!',
    user: 'Joan',
  },
  {
    title: 'Detailed service and kind staffs',
    description:
      'I have finally found my hair sanctuary! The hairstylists at this beauty shop are true artists. They took the time to understand my vision and transformed my hair into a masterpiece.',
    user: 'Madeline',
  },
  {
    title: 'Game changer',
    description:
      'The tranquil ambiance and skilled therapists make it my go-to place for relaxation and self-care. The trendy vibe and friendly staff make every visit an enjoyable experience. My go to place for a good service.',
    user: 'Alicia',
  },
];

const Home = () => {
  const { categories } = useContext(CategoriesContext);

  if (isEmpty(categories)) {
    fetchCategoriesData();
  }

  return (
    <div>
      {!isMobile() && <CarouselBanner />}
      {isMobile() && (
        <div className='link-container'>
          <a
            href='https://wa.me/15551234567'
            className='link-text link-no-decoration'
          >
            <Whatsapp size='28' />
          </a>
        </div>
      )}
      <CardGrid type='generic' cards={categories} />
      <Separator title='Review' />
      <CardReview reviews={REVIEWS_LIST} />
    </div>
  );
};

export default Home;
