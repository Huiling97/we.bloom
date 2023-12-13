import { type ReactNode } from 'react';
import {
  type CardGenericProps,
  type CardServicesProps,
} from '../../../types/card.ts';
import CardGeneric from '../card-generic/index.tsx';

import './style.scss';
import CardDetailed from '../card-detailed/index.tsx';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardGenericProps
  : CardServicesProps;

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
      {Object.entries(cards as CardGenericProps).map(([key, value], index) => {
        if (type === 'detailed') {
          const { name, description, details } = value;
          return (
            <CardDetailed
              key={index}
              name={name}
              description={description}
              details={details}
            />
          );
        }
        return (
          <CardGeneric
            description=''
            key={index}
            name={key}
            image={value.image}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
