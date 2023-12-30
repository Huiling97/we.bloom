import { type ReactNode } from 'react';
import {
  type CardGenericProps,
  type CardGenericObjectProps,
  type CardServicesProps,
  type CardDetailedFormInputProps,
} from '../../../types/card.ts';
import CardCategory from '../card-category/index.tsx';
import CardDetailed from '../card-detailed/index.tsx';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardGenericObjectProps
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
      <div className='grid-list'>
        {Object.entries(cards as CardProps<T>).map(([key, value], index) => {
          if (type === 'detailed') {
            const { name, description, details } =
              value as CardDetailedFormInputProps;
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
            <CardCategory
              key={index}
              id={(value as CardGenericProps).id}
              name={key}
              image={(value as CardGenericProps).image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardGrid;
