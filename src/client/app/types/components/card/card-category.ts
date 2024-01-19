export type CardCategoryProps = {
  id: string;
  name: string;
  image: string;
  description?: string;
  servicesCount?: number;
};

export interface CardCategoryObjectProps {
  [category: string]: CardCategoryProps;
}
