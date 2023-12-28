import { type CardGenericObjectProps } from '../types/card.ts';

const getCategoryById = (categories: CardGenericObjectProps, id: string) => {
  return Object.values(categories).find((category) => category.id === id);
};

export { getCategoryById };
