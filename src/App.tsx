import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './app/routes/home.tsx';
import Contact from './app/routes/contact.tsx';
import AllServices from './app/routes/services/all-services.tsx';
import Face from './app/routes/services/face.tsx';
import Body from './app/routes/services/body.tsx';
import Nail from './app/routes/services/nail.tsx';
import HairRemoval from './app/routes/services/hair-removal.tsx';
import Error from './app/routes/error.tsx';
import NavBar from './app/components/navbar/index.tsx';
import Footer from './app/components/footer/index.tsx';

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
          <AllServices />
          <Footer />
        </div>
      ),
      children: [
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
