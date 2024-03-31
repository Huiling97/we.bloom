import { render, screen } from '@testing-library/react';
import Manage from '../../../../routes/manage/manage-categories';
import { MemoryRouter } from 'react-router-dom';

describe('Manage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Manage />
      </MemoryRouter>
    );
  });

  it('should display loading spinner initially', () => {
    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should display the back link', () => {
    const backLink = screen.getByRole('link', { name: /Back/i });

    expect(backLink).toBeInTheDocument();
  });
});
