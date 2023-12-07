import ShowModal from '../../components/modal';
import CardGenericForm from '../../components/card/card-generic/form';
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

  return (
    <div>
      <ShowModal heading='Add new cateogry' form={CardGenericForm} />
      <CardGrid type='generic' cards={DUMMY_TITLES} />
    </div>
  );
};

export default AllServices;
