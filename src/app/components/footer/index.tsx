import { NavLink } from 'react-router-dom';
import { Facebook } from '@styled-icons/fa-brands';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-details-container bottom-padding'>
        <NavLink to='/manage' className='link-no-decoration footer-link'>
          Admin Login
        </NavLink>
        <div>
          <div>Blk 203 Hougang Street 21 #01-69 Singapore 530203 </div>
          <div>Whatsapp: +65 6282 1083</div>
        </div>
      </div>
      <div className='footer-details-container top-padding'>
        <div>Copyright 2023</div>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Facebook size='24' className='footer-logo' />
        </a>
      </div>
    </div>
  );
};

export default Footer;
