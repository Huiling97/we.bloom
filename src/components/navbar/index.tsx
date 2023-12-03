import './style.scss'

const TABS_LIST = [
  'Home',
  'Services',
  'Contact'
]

const NavBar = () => {
  return (
    <div className='navbar'>
      <ul className='navbar-list'>
        {TABS_LIST.map((tab) => {
          return (
            <li className='navbar-list-item' key={tab}>{tab}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavBar;
