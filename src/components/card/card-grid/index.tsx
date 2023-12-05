import { type ReactNode } from 'react';
import { type CardGenericProps } from '../card-generic/index.tsx';
import { type CardDetailedProps } from '../card-detailed/index.tsx';
import CardDetailed from '../card-detailed/index.tsx';
import CardGeneric from '../card-generic/index.tsx';

import './style.scss';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardGenericProps[]
  : CardDetailedProps[];

type CardGridProps<T extends CardTypeProps> = {
  type: T;
  cards: CardProps<T>;
};

const CardGrid = <T extends CardTypeProps>({
  type,
  cards,
}: CardGridProps<T>): ReactNode => {
  return (
    <div className='grid-container'>
      {cards.map((card) => {
        if (type === 'detailed') {
          const { title, description, details } = card as CardDetailedProps;
          return (
            <CardDetailed
              title={title}
              description={description}
              details={details}
            />
          );
        }
        const { title, image } = card as CardGenericProps;
        return <CardGeneric title={title} image={image} />;
      })}
    </div>
  );
};

export default CardGrid;
