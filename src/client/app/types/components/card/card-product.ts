export type ProductProps = {
  id: number;
  brand: string;
  category: string;
  name: string;
  size: string;
  price: number;
  details: string;
  usage: string;
  ingredients: string;
};

export type CardProductProps = {
  products: ProductProps[];
};
