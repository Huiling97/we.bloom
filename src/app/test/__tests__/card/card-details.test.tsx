import { render, screen } from '@testing-library/react';
import { cardDetailsProps } from '../../__mocks__/card-mock.ts';
import CardDetails from '../../../components/card/card-detailed/details/index.tsx';

describe('CardDetails', () => {
  it('should render component with duration', () => {
    render(<CardDetails {...cardDetailsProps} />);
    const duration = screen.getByText('60 mins');

    expect(duration).toBeInTheDocument();
  });

  it('should render component with price', () => {
    render(<CardDetails {...cardDetailsProps} />);
    const price = screen.getByText('$85');

    expect(price).toBeInTheDocument();
  });
});
