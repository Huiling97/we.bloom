import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllProviders from './app/store/index.tsx';

import Home from './app/routes/home.tsx';
import Contact from './app/routes/contact.tsx';
import DisplayServices from './app/routes/services/index.tsx';
import AllServices from './app/routes/services/all-services.tsx';
import Service from './app/routes/services/service.tsx';
import Error from './app/routes/error.tsx';
import NavBar from './app/components/navbar/index.tsx';
import AdminNavBar from './app/components/navbar/admin-navbar.tsx';
import Footer from './app/components/footer/index.tsx';
import Manage from './app/routes/manage.tsx';
import Login from './app/routes/login.tsx';
import Shop from './app/routes/shop.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <NavBar />
          <Home />
          <Footer />
        </>
      ),
      errorElement: <Error />,
    },
    {
      path: '/services',
      element: (
        <>
          <NavBar />
          <DisplayServices />
          <Footer />
        </>
      ),
      errorElement: <Error />,
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
        <>
          <NavBar />
          <Contact />
          <Footer />
        </>
      ),
      errorElement: <Error />,
    },
    {
      path: '/manage',
      element: (
        <>
          <AdminNavBar />
          <Manage />
        </>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/shop',
      element: (
        <>
          <NavBar />
          <Shop />
        </>
      ),
    },
  ]);

  return (
    <div className='page'>
      <AllProviders>
        <RouterProvider router={router} />
      </AllProviders>
    </div>
  );
}

export default App;
