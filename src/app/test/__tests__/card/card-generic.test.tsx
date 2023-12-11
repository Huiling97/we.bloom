import { render, screen } from '@testing-library/react';
import { cardGenericProps } from '../../__mocks__/card-mock.ts';
import CardGeneric from '../../../components/card/card-generic/index.tsx';

describe('CardGeneric', () => {
  it('should render component with title', () => {
    render(<CardGeneric {...cardGenericProps} />);
    const title = screen.getByText('Mock Title');

    expect(title).toBeInTheDocument();
  });

  it('should render component with image', () => {
    render(<CardGeneric {...cardGenericProps} />);
    const image = screen.getByAltText('category image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-image');
  });
});
