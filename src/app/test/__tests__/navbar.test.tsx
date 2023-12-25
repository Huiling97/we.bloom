import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/navbar/index.tsx';

window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });
  it('should render as many tabs as provided in the TABS_LIST', () => {
    const homeLink = screen.getByText('HOME');
    const servicesLink = screen.getByText('SERVICES');
    const contactLink = screen.getByText('CONTACT');
    const linkElements = screen.getAllByTestId('navbar-tab-item');

    expect(homeLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(linkElements).toHaveLength(3);
  });

  it('should open the offcanvas when toggled', () => {
    const menuBtn = screen.getByRole('button', {
      name: 'Toggle navigation',
    });

    fireEvent.click(menuBtn);

    const offcanvas = screen.getByRole('dialog');

    expect(offcanvas).toBeInTheDocument();
  });
});
