import { type ReactNode } from 'react';
import { type CardServicesProps } from '../../../types/card.ts';
import { type CardServiceFormInputProps } from '../../../types/form.ts';
import {
  type CardCategoryProps,
  type CardCategoryObjectProps,
} from '../../../types/card/card-category.ts';
import CardCategory from '../card-category/index.tsx';
import CardService from '../card-services/index.tsx';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardCategoryObjectProps
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
              value as CardServiceFormInputProps;
            return (
              <CardService
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
              id={(value as CardCategoryProps).id}
              name={key}
              image={(value as CardCategoryProps).image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardGrid;
