import { fireEvent, render, screen } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { cardGenericProps } from '../../../__mocks__/card-mock.ts';
import CardGeneric from '../../../../components/card/card-generic/index.tsx';

describe('CardGeneric', () => {
  it('should render component with title', () => {
    render(
      <BrowserRouter>
        <CardGeneric {...cardGenericProps} />
      </BrowserRouter>
    );

    const title = screen.getByText('MOCK TITLE');

    expect(title).toBeInTheDocument();
  });

  it('should render component with image', () => {
    render(
      <BrowserRouter>
        <CardGeneric {...cardGenericProps} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('category image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-image');
  });

  it('should render component with the correct hyperlink', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <CardGeneric {...cardGenericProps} />
      </Router>
    );

    const linkElement = screen.getByRole('link');

    fireEvent.click(linkElement);

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: `/services/${cardGenericProps.name}`,
        search: '',
      },
      undefined,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
        unstable_viewTransition: undefined,
      }
    );
  });
});
