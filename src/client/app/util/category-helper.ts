import { type CardCategoryObjectProps } from '../types/components/card/card-category';

const getCategoryById = (categories: CardCategoryObjectProps, id: string) => {
  return Object.values(categories).find((category) => category.id === id);
};

export { getCategoryById };
