import { render, screen } from '@testing-library/react';
import Manage from '../../../../../routes/manage/manage-categories';
import { MemoryRouter } from 'react-router-dom';

describe('Manage', () => {
  it('displays loading state initially', () => {
    render(
      <MemoryRouter>
        <Manage />
      </MemoryRouter>
    );
    const loadingText = screen.getByText('loading');

    expect(loadingText).toBeInTheDocument();
  });
});