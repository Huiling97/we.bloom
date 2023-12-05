import CarouselBanner from '../components/carousel/index.tsx';
import CardGrid from '../components/card/card-grid/index.tsx';

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

const Home = () => {
  return (
    <div>
      <CarouselBanner />
      <CardGrid type='generic' cards={DUMMY_TITLES} />
    </div>
  );
};

export default Home;
