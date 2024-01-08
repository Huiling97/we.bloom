import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PersonCircle } from '@styled-icons/bootstrap';
import { isMobile } from '../../util/screen-size-helper';
import { AuthContext } from '../../store/auth-context';

const AdminNavBar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

  const expand = isMobile() ? false : true;

  return (
    <Navbar expand={expand} sticky='top'>
      <Container fluid>
        <Navbar.Brand>
          <a href='/' className='navbar-logo-container link-no-decoration'>
            <img
              src='/logo/flower-gold.svg'
              alt='Logo'
              className='navbar-logo'
            />
            <div className='logo-text'>we.bloom</div>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-false-${expand}`}
          onClick={showHandler}
        />
        <Navbar.Offcanvas
          show={show}
          onHide={closeHandler}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement='end'
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <div className='navbar-container'>
                <a href='/'>
                  <Button>Return to home</Button>
                </a>
                {isAuthenticated && !isMobile() && (
                  <div className='navbar-list-item account-container account-avatar-icon-container'>
                    <PersonCircle size='24' />
                    <NavDropdown title='Admin' id='navbarScrollingDropdown'>
                      <NavDropdown.Item href='/'>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </div>
            </Nav>
          </Offcanvas.Body>
          {isAuthenticated && isMobile() && (
            <div className='account-container'>
              <div className='account-avatar-icon-container'>
                <PersonCircle size='24' />
                <div>Admin</div>
              </div>
              <a href='/' className='link-no-decoration account-link'>
                Logout
              </a>
            </div>
          )}
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
