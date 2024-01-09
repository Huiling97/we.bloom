import { render, screen } from '@testing-library/react';
import Manage from '../../../../routes/manage';
import { MemoryRouter } from 'react-router-dom';

describe('Manage', () => {
  it('should display loading state initially', () => {
    render(
      <MemoryRouter>
        <Manage />
      </MemoryRouter>
    );
    const loadingText = screen.getByText('loading');

    expect(loadingText).toBeInTheDocument();
  });
});
