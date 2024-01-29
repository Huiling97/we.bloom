import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllProviders from './app/store/index.tsx';

import Home from './app/routes/home.tsx';
import Contact from './app/routes/contact.tsx';
import DisplayOutlet from './app/routes/outlet.tsx';
import AllServices from './app/routes/services/all-services.tsx';
import Service from './app/routes/services/service.tsx';
import Error from './app/routes/error.tsx';
import NavBar from './app/components/navbar/index.tsx';
import AdminNavBar from './app/components/navbar/admin-navbar.tsx';
import Footer from './app/components/footer/index.tsx';
import ManageCategories from './app/routes/manage/manage-categories.tsx';
import Login from './app/routes/login.tsx';
import Shop from './app/routes/shop.tsx';
import ManageActions from './app/routes/manage/manage-actions.tsx';

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
          <DisplayOutlet />
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
      path: '/shop',
      element: (
        <>
          <NavBar />
          <Shop />
        </>
      ),
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
          <DisplayOutlet />
        </>
      ),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <ManageActions />,
        },
        {
          path: 'categories-and-services',
          element: <ManageCategories />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
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
