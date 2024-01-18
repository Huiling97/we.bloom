import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { CategoriesContext } from '../store/categories-context';
import { ProductsContext } from '../store/products-context';
import fetchCategoriesData from '../util/fetch-categories';
import { fetchProducts } from '../components/card/card-product/helpers';
import TabsTop from '../components/tabs/tab';
import LoadingSpinner from '../components/spinner';

const Shop = () => {
  const { categories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);

  if (isEmpty(categories)) {
    fetchCategoriesData();
  }

  if (isEmpty(products)) {
    fetchProducts();
  }

  return (
    <div>
      {isEmpty(products) || isEmpty(categories) ? (
        <LoadingSpinner />
      ) : (
        <TabsTop products={products} categories={categories} />
      )}
    </div>
  );
};

export default Shop;
