import { Outlet } from 'react-router-dom';

import NavBar from '../../components/navbar/index.tsx';

const AllServices = () => {
  return (
    <div>
      <NavBar />
      <div>AllServices page</div>
      <Outlet />
    </div>
  )
}

export default AllServices;
