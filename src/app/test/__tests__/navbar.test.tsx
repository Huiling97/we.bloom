import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar, { TABS_LIST } from '../../components/navbar/index.tsx';

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
    expect(linkElements).toHaveLength(Object.keys(TABS_LIST).length);
  });

  it('should open and close the offcanvas when toggled', async () => {
    const menuBtn = screen.getByRole('button', {
      name: 'Toggle navigation',
    });
    fireEvent.click(menuBtn);

    let offcanvas: HTMLElement | null = screen.getByRole('dialog');

    expect(offcanvas).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', {
      name: 'Close',
    });
    fireEvent.click(closeBtn);

    await waitFor(
      () => {
        offcanvas = screen.queryByRole('dialog');
        expect(offcanvas).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
