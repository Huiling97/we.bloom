import isDevEnv from '../is-dev-env';

interface URLConstantsProps {
  BASE: string;
  PRODUCTS_PATH: string;
  CART_PRODUCTS_PATH: string;
}

const URLConstants = <URLConstantsProps>{};

URLConstants.BASE = isDevEnv
  ? 'http://localhost:5000'
  : import.meta.env.VITE_BASE_API_URL;
URLConstants.PRODUCTS_PATH = `${URLConstants.BASE}/api/v1/products`;
URLConstants.CART_PRODUCTS_PATH = `${URLConstants.BASE}/api/v1/carts-products`;

export default URLConstants;
