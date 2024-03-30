import { type ReactNode } from 'react';
import { type AllProvidersProps } from '../types/context';
import { AuthContextProvider } from './auth-context';
import { ModalContextProvider } from './modal-context';
import { CategoryTypesContextProvider } from './category-types-context';
import { CategoriesContextProvider } from './categories-context';
import { DetailsContextProvider } from './details-context';
import { ServicesContextProvider } from './services-context';
import { ProductsContextProvider } from './products-context';
import { CartContextProvider } from './cart-context';

const AllProviders: React.FC<AllProvidersProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <CategoryTypesContextProvider>
          <CategoriesContextProvider>
            <ServicesContextProvider>
              <DetailsContextProvider>
                <ProductsContextProvider>
                  <CartContextProvider>{children}</CartContextProvider>
                </ProductsContextProvider>
              </DetailsContextProvider>
            </ServicesContextProvider>
          </CategoriesContextProvider>
        </CategoryTypesContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
};

export default AllProviders;
