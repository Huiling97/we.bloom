import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './routes/home';
import Contact from './routes/contact';
import AllServices from './routes/services/all-services';
import Face from './routes/services/face';
import Body from './routes/services/body';
import Nail from './routes/services/nail.tsx';
import HairRemoval from './routes/services/hair-removal.tsx';
import Error from './routes/error.tsx';
import NavBar from './components/navbar/index.tsx';

import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <NavBar />
          <Home />
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
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
