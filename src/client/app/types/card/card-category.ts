export interface CardCategoryProps {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface CardCategoryObjectProps {
  [category: string]: CardCategoryProps;
}
