import { Link } from 'react-router-dom';

import './style.scss'

const TABS_LIST = {
  home: '/',
  services: '/services',
  contact: '/contact'
}

const NavBar = () => {
  return (
    <div className='navbar'>
      <ul className='navbar-list'>
        {Object.entries(TABS_LIST).map(([key, value]) => {
          return (
            <li className='navbar-list-item' key={key}>
              <Link to={`${value}`}>{key}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavBar;
