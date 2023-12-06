import Banner from '../../components/banner/index.tsx';
import CardGrid from '../../components/card/card-grid/index.tsx';

const DUMMY_TITLES_DETAILED = [
  {
    title: 'Oxy-facial',
    description:
      'Deep cleansing that uses cleansing serum to dislodge and remove impurities from skin surface. Remove debris from pores with painless suction. Nourish with intense moisturizers that quench skin. Saturate the skin’s surface with antioxidants and peptides to maximize your glow. ',
    details: [
      {
        duration: 1,
        price: 10,
      },
      {
        duration: 60,
        price: 110,
      },
    ],
  },
  {
    title: 'Revitalizing Moisture Treatment',
    description:
      'Tapping into the rich traditions and skincare forrmulations from Japan, Shakura’s uniquely formulated Japanese Rejuvenating Facial Treatment is a gentle yet highly effective treatment for instant long lasting brightening and hydrating effects. The multi-step facial treatment deep cleanses, nourishes, hydrates and brightens skin to unveil brighter and clearer skin.',
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
      <Banner
        image='/src/app/assets/images/face.jpg'
        title='Face'
        description='Equipped with the latest technology and only using the quality products from Germany, achieve healthy, elastic, wrinkle-free and young-looking skin for yourself. 
        Treatments available for all skin types.'
      />
      <CardGrid type='detailed' cards={DUMMY_TITLES_DETAILED} />
    </div>
  );
};

export default Face;
