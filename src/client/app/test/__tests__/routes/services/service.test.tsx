import { render, screen } from '@testing-library/react';
import Service from '../../../../routes/services/service';

describe('Service', () => {
  it('displays loading spinner while fetching services data', () => {
    render(<Service />);
    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });
});
