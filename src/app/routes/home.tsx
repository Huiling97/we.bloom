import CarouselBanner from '../components/carousel/index.tsx';
import CardGrid from '../components/card/card-grid/index.tsx';
import CardReview from '../components/card/card-review/index.tsx';

const DUMMY_TITLES = [
  {
    title: 'Face',
    image: 'face',
  },
  {
    title: 'Body',
    image: 'body',
  },
  {
    title: 'Nail',
    image: 'nail',
  },
  {
    title: 'Hair Removal',
    image: 'hair-removal',
  },
];

const DUMMY_REVIEWS = [
  {
    title: 'It feels like my skin is finally able to breathe again',
    description:
      'I have sensitive skin and the beautician Jean has been very detailed about my facial service, every session was very skilful and relaxing for me. The manager Lynn also rendered great customer services, always friendly and prompt in making appointments. Overall, I received professional services and would recommend Xiu House! ',
    user: 'April',
  },
  {
    title: 'Very detailed treatment',
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    user: 'Joan',
  },
  {
    title:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
    description:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    user: 'testUser1',
  },
  {
    title: 'Excepteur sint occaecat cupidatat non proident',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    user: 'testUser2',
  },
];

const Home = () => {
  return (
    <div>
      <CarouselBanner />
      <CardGrid type='generic' cards={DUMMY_TITLES} />
      <CardReview reviews={DUMMY_REVIEWS} />
    </div>
  );
};

export default Home;
