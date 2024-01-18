export type ProductProps = {
  id: number;
  brand: string;
  category: string;
  name: string;
  size: string;
  rating: number;
  reviews_count: number;
  price: number;
  details: string;
  usage: string;
  ingredients: string;
};

export type CardProductProps = {
  products: ProductProps[];
};
