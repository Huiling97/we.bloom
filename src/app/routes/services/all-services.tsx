import CardGrid from '../../components/card/card-grid';

const AllServices = () => {
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

  return <CardGrid type='generic' cards={DUMMY_TITLES} />;
};

export default AllServices;
