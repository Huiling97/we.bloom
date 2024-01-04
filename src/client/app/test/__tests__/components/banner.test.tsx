import { render, screen } from '@testing-library/react';
import { bannerProps } from '../../__mocks__/banner-mock.ts';
import Banner from '../../../components/banner/index.tsx';

describe('Banner', () => {
  it('should render component with image', () => {
    render(<Banner {...bannerProps} />);
    const image = screen.getByAltText('Banner image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-image');
  });

  it('should render component with title', () => {
    render(<Banner {...bannerProps} />);
    const title = screen.getByText('Mock Title');

    expect(title).toBeInTheDocument();
  });

  it('should render component with description', () => {
    render(<Banner {...bannerProps} />);
    const description = screen.getByText('Mock description');

    expect(description).toBeInTheDocument();
  });
});
