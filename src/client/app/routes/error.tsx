import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Error = () => {
  return (
    <div className='content-centered content-flex-column'>
      <div className='error-text'>
        <div>Ooops, seems like you got lost</div>
        <div>Let&apos;s get you back home</div>
      </div>
      <Button>
        <NavLink to='/' className='link-no-decoration button-white'>
          Go Home
        </NavLink>
      </Button>
    </div>
  );
};

export default Error;
