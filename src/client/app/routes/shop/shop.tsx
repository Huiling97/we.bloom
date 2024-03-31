import { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { CategoryTypesContext } from '../../store/category-types-context';
import { CategoriesContext } from '../../store/categories-context';
import { ProductsContext } from '../../store/products-context';
import getCategories from '../../service/categories-service';
import { fetchProducts } from '../../components/card/card-product/helpers';
import TabsTop from '../../components/tabs/tab';
import LoadingSpinner from '../../components/spinner';

const Shop = () => {
  const { setCategoryTypes } = useContext(CategoryTypesContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEmpty(categories)) {
      getCategories(setCategoryTypes, setCategories, setIsLoading);
    }
  }, []);

  if (isEmpty(products)) {
    fetchProducts();
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TabsTop products={products} categories={categories} />
      )}
    </div>
  );
};

export default Shop;
