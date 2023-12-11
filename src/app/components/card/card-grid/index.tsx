import { type ReactNode } from 'react';
import {
  type CardGenericProps,
  type CardDetailedProps,
} from '../../../types/card.ts';
import CardGeneric from '../card-generic/index.tsx';

import './style.scss';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardGenericProps
  : CardDetailedProps;

type CardGridProps<T extends CardTypeProps> = {
  type: T;
  cards: CardProps<T>;
};

const CardGrid = <T extends CardTypeProps>({
  type,
  cards,
}: CardGridProps<T>): ReactNode => {
  console.log('cards return', cards);

  return (
    <div className='grid-container'>
      {Object.entries(cards as CardGenericProps).map(([key, value]) => {
        return (
          <CardGeneric
            key={key}
            title={key}
            image={{
              imageSrc: (value as { imageSrc: string }).imageSrc,
            }}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
