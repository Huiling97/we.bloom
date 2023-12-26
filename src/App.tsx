import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalContextProvider } from './app/store/modal-context.tsx';
import { CategoriesContextProvider } from './app/store/categories-context.tsx';
import { ServicesContextProvider } from './app/store/services-context.tsx';
import { DetailsContextProvider } from './app/store/details-context.tsx';

import Home from './app/routes/home.tsx';
import Contact from './app/routes/contact.tsx';
import DisplayServices from './app/routes/services/index.tsx';
import AllServices from './app/routes/services/all-services.tsx';
import Service from './app/routes/services/service.tsx';
import Error from './app/routes/error.tsx';
import NavBar from './app/components/navbar/index.tsx';
import Footer from './app/components/footer/index.tsx';
import Manage from './app/routes/manage.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <NavBar />
          <Home />
          <Footer />
        </div>
      ),
      errorElement: <Error />,
    },
    {
      path: '/services',
      element: (
        <div>
          <NavBar />
          <DisplayServices />
        </div>
      ),
      children: [
        {
          path: '',
          element: <AllServices />,
        },
        {
          path: ':id',
          element: <Service />,
        },
      ],
    },
    {
      path: '/contact',
      element: (
        <div>
          <NavBar />
          <Contact />
          <Footer />
        </div>
      ),
    },
    {
      path: '/manage',
      element: <Manage />,
    },
  ]);

  return (
    <div className='page'>
      <ModalContextProvider>
        <CategoriesContextProvider>
          <ServicesContextProvider>
            <DetailsContextProvider>
              <RouterProvider router={router} />
            </DetailsContextProvider>
          </ServicesContextProvider>
        </CategoriesContextProvider>
      </ModalContextProvider>
    </div>
  );
}

export default App;
