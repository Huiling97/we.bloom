import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalContextProvider } from './app/store/modal-context.tsx';
import { CategoriesContextProvider } from './app/store/categories-context.tsx';

import Home from './app/routes/home.tsx';
import Contact from './app/routes/contact.tsx';
import DisplayServices from './app/routes/services/index.tsx';
import AllServices from './app/routes/services/all-services.tsx';
import Face from './app/routes/services/face.tsx';
import Body from './app/routes/services/body.tsx';
import Nail from './app/routes/services/nail.tsx';
import HairRemoval from './app/routes/services/hair-removal.tsx';
import Error from './app/routes/error.tsx';
import NavBar from './app/components/navbar/index.tsx';
import Footer from './app/components/footer/index.tsx';
import Manage from './app/routes/manage.tsx';

import './App.css';

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
          <Footer />
        </div>
      ),
      children: [
        {
          path: '',
          element: <AllServices />,
        },
        {
          path: 'face',
          element: <Face />,
        },
        {
          path: 'body',
          element: <Body />,
        },
        {
          path: 'nail',
          element: <Nail />,
        },
        {
          path: 'hair-removal',
          element: <HairRemoval />,
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
    <ModalContextProvider>
      <CategoriesContextProvider>
        <RouterProvider router={router} />
      </CategoriesContextProvider>
    </ModalContextProvider>
  );
}

export default App;
