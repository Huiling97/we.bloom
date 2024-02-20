import { CategoriesContextProps } from '../../../types/context/categories';
import { ProductsContextProps } from '../../../types/context/products';

export type renderContextProps = {
  categoriesContextValue: CategoriesContextProps;
  productsContextValue: ProductsContextProps;
};
