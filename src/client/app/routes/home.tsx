import { useContext, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Whatsapp } from '@styled-icons/boxicons-logos';
import { CategoriesContext } from '../store/categories-context.tsx';
import { CartContext } from '../store/cart-context.tsx';
import LoadingSpinner from '../components/spinner/index.tsx';
import CarouselBanner from '../components/carousel/index.tsx';
import CardGrid from '../components/card/card-grid/index.tsx';
import CardReview from '../components/card/card-review/index.tsx';
import Separator from '../components/separator/index.tsx';
import fetchCategoriesData from '../util/fetch-categories.ts';
import { fetchCartsProducts } from '../util/fetch-carts-products.ts';
import { isMobile } from '../util/screen-size-helper.ts';
import { REVIEWS_LIST } from '../util/constants.ts';

const Home = () => {
  const { categories } = useContext(CategoriesContext);
  const { setCartItems } = useContext(CartContext);

  const fetchData = async () => {
    const cartProducts = await fetchCartsProducts();
    setCartItems(cartProducts);
    return cartProducts;
  };

  if (isEmpty(categories)) {
    fetchCategoriesData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isEmpty(categories) ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!isMobile() && <CarouselBanner />}
          {isMobile() && (
            <div className='link-container'>
              <a
                href='https://wa.me/15551234567'
                className='link-text link-no-decoration'
              >
                <Whatsapp size='28' />
              </a>
            </div>
          )}
          <Separator title='Our Services' />
          <CardGrid type='generic' cards={categories} />
          <Separator title='Review' />
          <CardReview reviews={REVIEWS_LIST} />
        </div>
      )}
    </div>
  );
};

export default Home;
