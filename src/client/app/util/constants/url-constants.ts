interface URLConstantsProps {
  BASE: string;
  PRODUCTS_PATH: string;
  CART_PRODUCTS_PATH: string;
}

const URLConstants = <URLConstantsProps>{};

URLConstants.BASE =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000';
URLConstants.PRODUCTS_PATH = `${URLConstants.BASE}/api/v1/products`;
URLConstants.CART_PRODUCTS_PATH = `${URLConstants.BASE}/api/v1/carts-products`;

export default URLConstants;
