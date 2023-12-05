import './styles.scss';

export type CardGenericProps = {
  title: string;
  image: string;
};

const CardGeneric = (card: CardGenericProps) => {
  const { title, image } = card;
  return (
    <div className='card-container'>
      <img src={`src/assets/images/${image}.jpg`} className='card-image' />
      <div className='card-title'>{title}</div>
    </div>
  );
};

export default CardGeneric;
