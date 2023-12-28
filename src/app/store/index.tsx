import { type AllProvidersProps } from '../types/context';
import { ModalContextProvider } from './modal-context';
import { CategoriesContextProvider } from './categories-context';
import { DetailsContextProvider } from './details-context';
import { ServicesContextProvider } from './services-context';

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  return (
    <ModalContextProvider>
      <CategoriesContextProvider>
        <ServicesContextProvider>
          <DetailsContextProvider>{children}</DetailsContextProvider>
        </ServicesContextProvider>
      </CategoriesContextProvider>
    </ModalContextProvider>
  );
};

export default AllProviders;
