import { type CardGenericObjectProps } from '../../types/card.ts';
import ShowModal from '../../components/modal';
import CardGenericForm from '../../components/card/card-generic/form';
import CardGrid from '../../components/card/card-grid';

import { ref, onValue } from 'firebase/database';
import { database } from '../../../main';

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

  const categoriesRef = ref(database, '/categories');
  let data: CardGenericObjectProps = {};
  onValue(categoriesRef, (snapshot) => {
    data = snapshot.val();
  });

  console.log('data', data);

  return (
    <div>
      <ShowModal heading='Add new cateogry' form={CardGenericForm} />
      <CardGrid type='generic' cards={DUMMY_TITLES} />
    </div>
  );
};

export default AllServices;
