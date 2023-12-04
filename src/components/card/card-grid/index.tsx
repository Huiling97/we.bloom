import {
  type CardOverviewProps,
  type CardDetailedProps,
  type CardTypeProps,
} from '../card-item/index.tsx';
import Card from '../card-item/index.tsx';

import './style.scss';

type CardsProps = CardOverviewProps[] | CardDetailedProps[];

type CardGridProps<T extends CardTypeProps, C extends CardsProps> = {
  type: T;
  cards: C;
};

const CardGrid = <T extends CardTypeProps, C extends CardsProps>({
  type,
  cards,
}: CardGridProps<T, C>) => {
  return (
    <div className='grid-container'>
      {cards.map((card) => {
        return <Card type={type} card={card} />;
      })}
      ;
    </div>
  );
};

export default CardGrid;
