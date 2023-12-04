import CardGrid from '../../components/card/card-grid/index.tsx';

const DUMMY_TITLES_DETAILED = [
  {
    title: 'title 1',
    description: 'description 1',
    details: [
      {
        duration: 1,
        price: 10,
      },
    ],
  },
  {
    title: 'title 2',
    description: 'description 2',
    details: [
      {
        duration: 2,
        price: 20,
      },
    ],
  },
];

const Face = () => {
  return (
    <div>
      <div>Face page</div>
      <CardGrid type='detailed' cards={DUMMY_TITLES_DETAILED} />
    </div>
  );
};

export default Face;
