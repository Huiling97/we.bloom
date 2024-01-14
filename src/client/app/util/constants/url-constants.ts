interface URLConstantsProps {
  BASE: string;
  PRODUCTS_PATH: string;
}

const URLConstants = <URLConstantsProps>{};

URLConstants.BASE =
  'http://localhost:5000' || import.meta.env.VITE_BASE_API_URL;
URLConstants.PRODUCTS_PATH = `${URLConstants.BASE}/api/v1/products`;

export default URLConstants;
