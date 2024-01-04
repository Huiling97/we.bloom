import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error from '../../../../routes/error.tsx';

describe('Erorr', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
  });

  it('should render error message', () => {
    const errorMessageMain = screen.getByText(
      /Ooops, seems like you got lost/i
    );
    const errorMessageSecondary = screen.getByText(/Let's get you back home/i);

    expect(errorMessageMain).toBeInTheDocument();
    expect(errorMessageSecondary).toBeInTheDocument();
  });

  it('should render a button with link to the home page', () => {
    const homeBtn = screen.getByRole('button', { name: 'Go Home' });
    const homeLink = screen.getByRole('link', { name: 'Go Home' });

    expect(homeBtn).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
