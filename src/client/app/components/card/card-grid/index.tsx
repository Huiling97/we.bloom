import { type ReactNode } from 'react';
import { type CardServiceObjectProps } from '../../../types/card/card-service.ts';
import { type CardServiceFormInputProps } from '../../../types/form.ts';
import { type CardCategoryObjectProps } from '../../../types/card/card-category.ts';
import CardCategory from '../card-category/index.tsx';
import CardService from '../card-services/index.tsx';

type CardTypeProps = 'generic' | 'detailed';
type CardProps<T extends CardTypeProps> = T extends 'generic'
  ? CardCategoryObjectProps
  : CardServiceObjectProps;

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
          } else {
            const { id, image, servicesCount } = value;
            if (servicesCount !== 0) {
              return (
                <CardCategory key={index} id={id} name={key} image={image} />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default CardGrid;
