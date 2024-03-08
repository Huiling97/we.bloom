import { CartContextProps } from '../../../types/context/cart';
import { CategoriesContextProps } from '../../../types/context/categories';
import { ProductsContextProps } from '../../../types/context/products';

export type renderShopContextProps = {
  categoriesContextValue: CategoriesContextProps;
  productsContextValue: ProductsContextProps;
};

export type renderCartContextProps = {
  cartContextValue: CartContextProps;
};
