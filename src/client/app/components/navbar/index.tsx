import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { isMobile } from '../../util/screen-size-helper';

export const TABS_LIST = {
  home: '/',
  services: '/services',
  contact: '/contact',
};

const NavBar = () => {
  const [show, setShow] = useState(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

  const expand = isMobile() ? false : true;

  return (
    <Navbar expand={expand} sticky='top'>
      <Container fluid>
        <Navbar.Brand>
          <NavLink to='/' className='navbar-logo-container link-no-decoration'>
            <img
              src='/logo/flower-gold.svg'
              alt='Logo'
              className='navbar-logo'
            />
            <div className='logo-text'>we.bloom</div>
          </NavLink>
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
                {Object.entries(TABS_LIST).map(([key, value]) => {
                  return (
                    <div
                      className='navbar-list-item '
                      key={key}
                      onClick={closeHandler}
                      data-testid='navbar-tab-item'
                    >
                      <NavLink
                        to={`${value}`}
                        className='navbar-link link-no-decoration'
                      >
                        {key.toUpperCase()}
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
