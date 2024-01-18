import { type AllProvidersProps } from '../types/context';
import { AuthContextProvider } from './auth-context';
import { ModalContextProvider } from './modal-context';
import { CategoriesContextProvider } from './categories-context';
import { DetailsContextProvider } from './details-context';
import { ServicesContextProvider } from './services-context';
import { ProductsContextProvider } from './products-context';

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <CategoriesContextProvider>
          <ServicesContextProvider>
            <DetailsContextProvider>
              <ProductsContextProvider>{children}</ProductsContextProvider>
            </DetailsContextProvider>
          </ServicesContextProvider>
        </CategoriesContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
};

export default AllProviders;
